import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as vehicleSchema from './schema/log.schema';
import { v4 as uuidv4 } from 'uuid';

// --- Type Definitions Specific to this Logger ---

/**
 * Represents potential changes to the vehicle's state to be logged.
 * Includes all fields from the `vehicle_behavior_logs` table (except generated ones)
 * plus any additional contextual data. Keys are camelCase, matching the DB schema.
 */
type VehicleStateChange = Partial<Omit<vehicleSchema.NewVehicleBehaviorLog, 'id' | 'timestamp' | 'sessionId'>>;

/**
 * Defines the structure of the payload sent to the external REST API.
 * Keys are UPPERCASE as required by the API specification.
 * Only includes the minimal set of fields required by the API.
 */
type ApiLogPayload = Partial<{
  WALL: vehicleSchema.WallPosition;
  CARD: vehicleSchema.CardColor;
  POSITION: vehicleSchema.VehiclePosition;
  BRIGHTNESS: vehicleSchema.BrightnessLevel;
  MOVING_CARD: vehicleSchema.CardAction; // Note: API uses MOVING_CARD
  DRIVE: vehicleSchema.DriveDirection;
  LIGHT: vehicleSchema.LightState;
  AKKU: string; // Battery level as a string for the API.
  STATUS: vehicleSchema.VehicleStatus;
}> & {
  TIMESTAMP: string; // Timestamp formatted as DD/MM/YYYY hh:mm:ss
};

/**
 * Represents the logger's internal understanding of the vehicle's current state.
 * Used to detect changes before logging. Keys are camelCase for consistency with the database schema.
 */
interface VehicleState {
  wall: vehicleSchema.WallPosition;
  card: vehicleSchema.CardColor;
  position: vehicleSchema.VehiclePosition;
  brightness: vehicleSchema.BrightnessLevel;
  movingCard: vehicleSchema.CardAction; // Note: Internal state uses movingCard (camelCase)
  drive: vehicleSchema.DriveDirection;
  light: vehicleSchema.LightState;
  akku: number; // Battery level stored internally as a number.
  status: vehicleSchema.VehicleStatus;
  // Optional additional state fields (useful if their changes should also trigger logs or be included)
  currentTask?: string;
  gripperStatus?: string;
}

/**
 * VehicleLogger class responsible for:
 * 1. Tracking the vehicle's state.
 * 2. Sending minimal state changes (UPPERCASE keys) to an external REST API.
 * 3. Logging detailed state changes (camelCase keys, with extra data) to a local database using Drizzle.
 * 4. Optionally logging general application messages to a separate DB table.
 */
export class VehicleLogger {
  private apiUrl: string;
  private currentState: VehicleState;
  private isSendingApi: boolean = false; // Prevents concurrent API requests.
  private apiQueue: ApiLogPayload[] = []; // Queue for outgoing API payloads.

  private db: NodePgDatabase<typeof vehicleSchema>; // Drizzle DB instance. Adjust type if not using node-postgres.
  private behaviorLogsTable: typeof vehicleSchema.vehicleBehaviorLogsTable; // Reference to the detailed behavior log table schema.
  private generalLogsTable?: typeof vehicleSchema.logs; // Optional reference to the general logs table schema.

  private currentSessionId: string; // UUID to group logs for a single run/session.

  /**
   * Initializes the VehicleLogger.
   * @param apiUrl The endpoint URL for the external REST API.
   * @param db The configured Drizzle database instance.
   * @param schema The imported Drizzle schema object (must include vehicleBehaviorLogsTable, optionally logs).
   * @param initialState Optional initial state values for the vehicle.
   * @param initialSessionId Optional existing session ID to continue logging under.
   */
  constructor(
    apiUrl: string,
    db: NodePgDatabase<typeof vehicleSchema>, // Adjust type if not using node-postgres
    schema: typeof vehicleSchema,
    initialState?: Partial<VehicleState>,
    initialSessionId?: string
  ) {
    if (!apiUrl) throw new Error("API URL must be provided.");
    if (!db) throw new Error("Drizzle DB instance must be provided.");
    if (!schema?.vehicleBehaviorLogsTable) throw new Error("Drizzle schema with vehicleBehaviorLogsTable must be provided.");

    this.apiUrl = apiUrl;
    this.db = db;
    // Store references to the Drizzle table schemas for later use.
    this.behaviorLogsTable = schema.vehicleBehaviorLogsTable;

    // Check if the general logs table schema is provided. If so, enable general logging.
    if (schema.logs) {
      this.generalLogsTable = schema.logs;
    } else {
      // Warn if general logging will be disabled due to missing schema.
      console.warn("General logs table schema (schema.logs) not provided to VehicleLogger. General logging disabled.");
      // this.generalLogsTable remains undefined.
    }

    // Initialize or generate a new session ID for grouping log entries.
    this.currentSessionId = initialSessionId || uuidv4();
    console.log(`VehicleLogger initialized for session: ${this.currentSessionId}`);

    // Set up the initial internal state, using defaults or provided values. Uses camelCase keys.
    this.currentState = {
      wall: 'none', card: 'none', position: 'start', brightness: 'none',
      movingCard: 'none', drive: 'stop', light: 'OFF', akku: 100,
      status: 'ON',
      ...initialState, // Apply overrides from initialState
    };
    console.log("Initial state:", this.currentState);

    // Log the initial state to the database at startup.
    // This uses 'SYSTEM' as triggerSource, ensure your DB schema enum allows this!
    this.logInitialStateToDb();
  }

  // Formats the timestamp specifically for the API requirement (DD/MM/YYYY hh:mm:ss).
  private getFormattedTimestampForApi(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed.
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Processes detected state changes intended for the external API.
   * Filters only the fields required by the API spec, converts keys from internal camelCase
   * to external UPPERCASE, formats the AKKU value as a string, adds the formatted timestamp,
   * and queues the resulting payload for asynchronous sending.
   * @param changes An object containing only the changed key-value pairs from the internal state (camelCase).
   */
  private async processAndSendToApi(changes: Partial<VehicleState>): Promise<void> {
    const apiPayload: ApiLogPayload = { TIMESTAMP: this.getFormattedTimestampForApi() };
    let hasChangesForApi = false; // Flag to check if any relevant changes were found.

    // Defines the mapping from internal state keys (camelCase) to API payload keys (UPPERCASE).
    const keyMapping: { [K in keyof VehicleState]?: keyof Omit<ApiLogPayload, 'TIMESTAMP'> } = {
      wall: 'WALL', card: 'CARD', position: 'POSITION', brightness: 'BRIGHTNESS',
      movingCard: 'MOVING_CARD', drive: 'DRIVE', light: 'LIGHT',
      akku: 'AKKU', status: 'STATUS'
      // Add mappings here if more internal states need to be sent to the API.
    };

    // Iterate through the provided changes.
    for (const key in changes) {
      const typedKey = key as keyof VehicleState;
      const targetApiKey = keyMapping[typedKey]; // Find the corresponding API key.

      // If a mapping exists (i.e., this state is relevant to the API)
      if (targetApiKey) {
        const value = changes[typedKey];
        // Skip if the value is somehow undefined.
        if (value === undefined) continue;

        hasChangesForApi = true; // Mark that we have something to send.
        // Special handling for battery level: convert number to string.
        if (targetApiKey === 'AKKU' && typeof value === 'number') {
          apiPayload.AKKU = String(value);
        } else if (targetApiKey !== 'AKKU') {
          // Assign other values directly.
          // Using 'any' here is a pragmatic choice to avoid complex type assertions
          // due to the mapping between different keys and potential type differences (e.g., number vs string).
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (apiPayload as any)[targetApiKey] = value;
        }
      }
    }

    // If no relevant changes for the API were found, do nothing.
    if (!hasChangesForApi) return;

    // Add the generated payload to the queue.
    this.apiQueue.push(apiPayload);
    // If the sender is not currently busy, start processing the queue.
    if (!this.isSendingApi) {
      this.sendNextApiLogInQueue();
    }
  }

  /**
   * Sends the next log payload from the `apiQueue` to the configured `apiUrl`.
   * Works asynchronously and ensures only one request is active at a time using `isSendingApi`.
   * Handles basic fetch errors.
   */
  private async sendNextApiLogInQueue(): Promise<void> {
    // Do nothing if queue is empty or already sending.
    if (this.apiQueue.length === 0 || this.isSendingApi) return;

    this.isSendingApi = true; // Lock sending process.
    const payloadToSend = this.apiQueue.shift(); // Get the oldest payload.

    if (!payloadToSend) { // Should theoretically not happen if length > 0, but safety check.
      this.isSendingApi = false;
      return;
    }

    console.log(`Sending log to API ${this.apiUrl}:`, JSON.stringify(payloadToSend));
    try {
      // Perform the API request.
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(payloadToSend),
      });
      // Basic check for API errors.
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}. Payload:`, JSON.stringify(payloadToSend));
        // Consider adding retry logic or moving payload back to queue here.
      } else {
        console.log("API Log sent successfully.");
      }
    } catch (error: unknown) { // Catch network or other fetch-related errors.
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to send API log:", errorMessage);
      // Consider adding retry logic or moving payload back to queue here.
    } finally {
      this.isSendingApi = false; // Release the lock.
      this.sendNextApiLogInQueue(); // Immediately try to send the next item, if any.
    }
  }

  /**
   * Logs detailed behavior changes directly to the database (`vehicle_behavior_logs` table).
   * This method uses camelCase keys matching the database schema and includes the current session ID
   * and a precise timestamp. It handles potential database insertion errors.
   * @param changes An object containing changed key-value pairs, including potentially detailed fields not sent to the API.
   */
  private async logBehaviorToDatabase(changes: VehicleStateChange): Promise<void> {
    // Don't log if there are no changes.
    if (Object.keys(changes).length === 0) return;

    const now = new Date(); // Get the current timestamp for the DB record.
    // Construct the database record object.
    const dbRecord: vehicleSchema.NewVehicleBehaviorLog = {
      sessionId: this.currentSessionId, // Add the current session ID.
      timestamp: now,                  // Add the precise timestamp.
      ...changes,                      // Spread the received changes (should match DB schema columns).
    };

    console.debug("Logging behavior to DB:", dbRecord);
    try {
      // Insert the record into the behavior log table using Drizzle.
      await this.db.insert(this.behaviorLogsTable).values(dbRecord).execute();
    } catch (error: unknown) { // Catch potential database errors.
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save behavior log to database:", errorMessage);
      // If general logging is enabled, log this database error there for monitoring.
      if (this.generalLogsTable) {
        // Pass the original error and the failed record for context.
        this.logGeneralError("DB Behavior Log Failed", error, { record: dbRecord });
      }
    }
  }

  /**
   * Logs the complete current internal state to the database's behavior log table.
   * Typically called on logger initialization or when starting a new session
   * to establish a baseline state in the logs.
   * Sets the `triggerSource` to 'SYSTEM'.
   */
  private logInitialStateToDb(): void {
    // Create a record based on the complete `currentState`.
    const initialStateRecord: VehicleStateChange = {
      wall: this.currentState.wall,
      card: this.currentState.card,
      position: this.currentState.position,
      brightness: this.currentState.brightness,
      movingCard: this.currentState.movingCard,
      drive: this.currentState.drive,
      light: this.currentState.light,
      akku: this.currentState.akku,
      status: this.currentState.status,
      currentTask: this.currentState.currentTask, // Include optional state fields if they exist
      gripperStatus: this.currentState.gripperStatus,
      // Mark this initial log as a 'SYSTEM' event.
      // IMPORTANT: Ensure 'SYSTEM' is defined in your `triggerSourceEnum` or text enum in schema.ts!
      triggerSource: 'SYSTEM'
    };
    // Log this record asynchronously. Errors are caught within logBehaviorToDatabase.
    this.logBehaviorToDatabase(initialStateRecord).catch(err => console.error("Failed initial DB log:", err));
  }


  /**
   * Logs a general-purpose message to the separate 'Logs' table, if its schema was provided during initialization.
   * This is intended for application-level events, debugging, or operational messages,
   * distinct from the structured vehicle behavior logs.
   * @param level The severity level of the log (e.g., 'INFO', 'ERROR'). Must match `logLevelEnum`.
   * @param component The part of the application generating the log (e.g., 'VehicleController', 'MainApp').
   * @param message The primary log message text.
   * @param details Optional additional data or context (object, array, primitive) to be stored as JSONB.
   * @param simplifiedMessage An optional, potentially shorter or categorized version of the message.
   */
  logGeneralMessage(
    level: typeof vehicleSchema.logLevelEnum.enumValues[number], // Use the correct type derived from the Drizzle enum
    component: string,
    message: string,
    details?: unknown, // Use 'unknown' for better type safety than 'any'.
    simplifiedMessage?: string
  ): void {
    // Only proceed if the general logs table schema was provided.
    if (!this.generalLogsTable) return;

    // Log to console as well for immediate visibility.
    console.log(`[${level}] ${component}: ${message}`, details || '');
    // Insert the log entry into the database asynchronously.
    this.db.insert(this.generalLogsTable).values({
      level,
      component,
      message,
      // Ensure details is null if undefined, as JSONB columns typically don't accept undefined.
      details: details ?? null,
      simplifiedMessage,
      // 'createdAt' is usually set by the database default.
    }).catch((error: unknown) => { // Catch potential DB errors.
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Log failure to console, avoid infinite loop if general logging itself fails.
      console.error("Failed to save general log to database:", errorMessage);
    });
  }

  /**
   * A convenience method for logging errors to the general 'Logs' table.
   * Automatically sets the level to 'ERROR' and includes error details like message and stack trace.
   * @param message A descriptive message context for the error.
   * @param error The actual error object or value caught.
   * @param details Optional additional context to be included with the error details.
   */
  logGeneralError(message: string, error: unknown, details?: unknown): void {
    // If general logging is disabled, just log the error to the console.
    if (!this.generalLogsTable) {
      console.error(`[ERROR] VehicleLogger (General Log Disabled): ${message}: ${error instanceof Error ? error.message : String(error)}`, details);
      return;
    }

    // Safely extract error message and stack trace.
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    // Ensure details is an object so the stack can be added.
    const detailsObject = typeof details === 'object' && details !== null ? details : { data: details };

    // Use logGeneralMessage to perform the actual logging.
    this.logGeneralMessage(
      'ERROR',                    // Set level to ERROR.
      'VehicleLogger',            // Default component for internal logger errors.
      `${message}: ${errorMessage}`, // Combine context message and error message.
      // Combine provided details with the error stack trace.
      { ...detailsObject, stack: errorStack },
    );
  }


  // --- Central Change Handling ---

  /**
   * Central private method called by public `log...` methods whenever a state change is detected.
   * It orchestrates the two main logging actions:
   * 1. Queues the relevant, formatted data for sending to the external API (via `processAndSendToApi`).
   * 2. Logs the detailed change, including any extra contextual data, to the local database (via `logBehaviorToDatabase`).
   * Database logging is performed asynchronously ("fire-and-forget") with internal error handling
   * to prevent blocking the main application flow.
   * @param changes An object containing all changed key-value pairs (camelCase), including extra details for the DB.
   */
  private handleChange(changes: VehicleStateChange): void {
    // 1. Process and queue for API sending (handles filtering, formatting, UPPERCASE conversion).
    // Type assertion is acceptable here as processAndSendToApi expects a subset of VehicleState.
    this.processAndSendToApi(changes as Partial<VehicleState>);

    // 2. Log detailed changes to the database (uses camelCase keys directly).
    // Call is asynchronous; errors are caught within logBehaviorToDatabase.
    this.logBehaviorToDatabase(changes).catch(err => {
      // Catch potential unhandled promise rejection from logBehaviorToDatabase itself.
      console.error("Unhandled error during DB behavior logging initiation:", err);
    });
  }

  // --- Public Methods for Logging Specific State Changes ---
  // These methods compare the new value with the `currentState`, update the state if different,
  // and call `handleChange` to trigger API and DB logging. They can accept extra parameters
  // for detailed DB logging.

  /**
   * Logs a change in the detected wall state.
   * Sends 'WALL' to API if changed. Logs 'wall' and optional distance sensor data to DB.
   * @param wallValue The new wall detection state ('front', 'none', etc.).
   * @param distanceCm Optional raw distance sensor reading (in cm) for detailed database logging.
   */
  logWallDetection(wallValue: vehicleSchema.WallPosition, distanceCm?: number): void {
    // Only log if the state has actually changed.
    if (this.currentState.wall !== wallValue) {
      console.debug(`WALL change: ${this.currentState.wall} -> ${wallValue}${distanceCm !== undefined ? ` (Dist: ${distanceCm}cm)` : ''}`);
      // Prepare the change object for the database log. Start with the core change.
      const changes: VehicleStateChange = { wall: wallValue }; // DB key: wall (camelCase)
      // Add specific distance measurement based on the wall detected, if provided.
      if (distanceCm !== undefined) {
        switch (wallValue) { // Map distance to the correct DB column.
          case 'front': changes.distanceFrontCm = distanceCm; break;
          case 'left': changes.distanceLeftCm = distanceCm; break;
          case 'right': changes.distanceRightCm = distanceCm; break;
          case 'back': changes.distanceBackCm = distanceCm; break;
          // No distance logging if wall is 'none'.
        }
      }
      // Indicate that a sensor triggered this change.
      changes.triggerSource = 'SENSOR';
      // Update the internal state *before* calling handleChange.
      this.currentState.wall = wallValue;
      // Trigger API send and DB log.
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the detected card state.
   * Sends 'CARD' to API if changed. Logs 'card' to DB.
   * @param cardValue The new card detection state ('red', 'blue', 'none').
   */
  logCardDetection(cardValue: vehicleSchema.CardColor): void {
    if (this.currentState.card !== cardValue) {
      console.debug(`CARD change: ${this.currentState.card} -> ${cardValue}`);
      const changes: VehicleStateChange = { card: cardValue, triggerSource: 'SENSOR' }; // DB key: card
      this.currentState.card = cardValue;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the vehicle's driving state.
   * Sends 'DRIVE' to API if changed. Logs 'drive' and optional motor power levels to DB.
   * @param direction The new driving direction ('forward', 'stop', etc.).
   * @param motorLeft Optional power level for the left motor (e.g., -1 to 1) for DB logging.
   * @param motorRight Optional power level for the right motor (e.g., -1 to 1) for DB logging.
   */
  logDrive(direction: vehicleSchema.DriveDirection, motorLeft?: number, motorRight?: number): void {
    if (this.currentState.drive !== direction) {
      console.debug(`DRIVE change: ${this.currentState.drive} -> ${direction}`);
      const changes: VehicleStateChange = { drive: direction }; // DB key: drive
      // Include detailed motor power if provided.
      if (motorLeft !== undefined) changes.motorLeftPower = motorLeft;
      if (motorRight !== undefined) changes.motorRightPower = motorRight;
      // Infer trigger source based on current vehicle mode.
      changes.triggerSource = this.currentState.status === 'auto' ? 'AUTO' : 'MANUAL';
      this.currentState.drive = direction;
      this.handleChange(changes);
    }
    // Consider adding logic here to log motor power changes even if direction remains the same, if needed.
  }

  /**
   * Logs a change in the card manipulation action state.
   * Sends 'MOVING_CARD' to API if changed. Logs 'movingCard' and optional gripper/error details to DB.
   * IMPORTANT: The caller should call this again with 'none' once the action is complete.
   * @param action The current card action ('pick up', 'discard', 'none').
   * @param gripper Optional status of the gripper mechanism (e.g., 'OPEN', 'CLOSED') for DB logging.
   * @param error Optional error code if the action failed (e.g., 'GRIPPER_FAIL') for DB logging.
   */
  logCardAction(action: vehicleSchema.CardAction, gripper?: string, error?: string): void {
    if (this.currentState.movingCard !== action) {
      console.debug(`MOVING_CARD change: ${this.currentState.movingCard} -> ${action}`);
      const changes: VehicleStateChange = { movingCard: action }; // DB key: movingCard
      // Include optional details for the DB log.
      if (gripper) changes.gripperStatus = gripper;
      if (error) changes.errorCode = error;
      changes.triggerSource = this.currentState.status === 'auto' ? 'AUTO' : 'MANUAL'; // Infer trigger
      this.currentState.movingCard = action;
      // Optionally update internal state for gripper too, if useful elsewhere.
      if (gripper) this.currentState.gripperStatus = gripper;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the vehicle's logical position.
   * Sends 'POSITION' to API if changed. Logs 'position' to DB.
   * @param positionValue The new logical position ('start', 'field', 'end').
   */
  logPositionChange(positionValue: vehicleSchema.VehiclePosition): void {
    if (this.currentState.position !== positionValue) {
      console.debug(`POSITION change: ${this.currentState.position} -> ${positionValue}`);
      // Position changes usually occur during autonomous operation.
      const changes: VehicleStateChange = { position: positionValue, triggerSource: 'AUTO' }; // DB key: position
      this.currentState.position = positionValue;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the vehicle's light state.
   * Sends 'LIGHT' to API if changed. Logs 'light' to DB.
   * @param state The new light state ('ON', 'OFF').
   */
  logLightState(state: vehicleSchema.LightState): void {
    if (this.currentState.light !== state) {
      console.debug(`LIGHT change: ${this.currentState.light} -> ${state}`);
      // Trigger source might depend on context (auto or manual). Defaulting to AUTO.
      const changes: VehicleStateChange = { light: state, triggerSource: 'AUTO' }; // DB key: light
      this.currentState.light = state;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the vehicle's battery level.
   * Sends 'AKKU' (as string) to API if changed. Logs 'akku' (as number) to DB.
   * @param level The battery level percentage (0-100). Values outside this range are clamped.
   */
  logAkkuLevel(level: number): void {
    // Ensure level is within 0-100 and rounded.
    const clampedLevel = Math.max(0, Math.min(100, Math.round(level)));
    if (this.currentState.akku !== clampedLevel) {
      console.debug(`AKKU change: ${this.currentState.akku}% -> ${clampedLevel}%`);
      const changes: VehicleStateChange = { akku: clampedLevel }; // DB key: akku
      this.currentState.akku = clampedLevel;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the overall vehicle status.
   * Sends 'STATUS' to API if changed. Logs 'status' and the trigger source to DB.
   * @param statusValue The new vehicle status ('ON', 'READY', 'auto', 'manual').
   * @param trigger Optional source of the status change (e.g., 'MANUAL', 'SYSTEM'). If omitted, it's inferred.
   */
  logStatusChange(statusValue: vehicleSchema.VehicleStatus, trigger?: vehicleSchema.NewVehicleBehaviorLog['triggerSource']): void {
    if (this.currentState.status !== statusValue) {
      console.debug(`STATUS change: ${this.currentState.status} -> ${statusValue}`);
      const changes: VehicleStateChange = { status: statusValue }; // DB key: status
      // Determine the trigger source. Infer if not provided. 'SYSTEM' used for non-interactive changes.
      // IMPORTANT: Ensure 'SYSTEM' is defined in your `triggerSourceEnum` or text enum in schema.ts!
      changes.triggerSource = trigger ?? (statusValue === 'auto' || statusValue === 'manual' ? 'MANUAL' : 'SYSTEM');
      this.currentState.status = statusValue;
      this.handleChange(changes);
    }
  }

  /**
   * Logs a change in the vehicle's current high-level task (for detailed DB logging only).
   * This does *not* send any data to the external API.
   * @param task A string describing the current task (e.g., 'SEARCHING_CARD', 'RETURNING_TO_START').
   */
  setCurrentTask(task: string): void {
    // Only log if the task description has changed.
    if (this.currentState.currentTask !== task) {
      console.debug(`TASK change: ${this.currentState.currentTask} -> ${task}`);
      // Update internal state.
      this.currentState.currentTask = task;
      // Log *only* to the database. Trigger assumed to be 'AUTO'.
      this.logBehaviorToDatabase({ currentTask: task, triggerSource: 'AUTO' })
        .catch(err => console.error("Failed logging task change:", err)); // Catch potential errors.
    }
  }

  /**
   * Starts a new logging session, generating a new session ID.
   * Logs the start of the new session to the general log (if enabled) and
   * logs the current vehicle state to the behavior log table as the first entry of the new session.
   * @param sessionId An optional existing UUID to use instead of generating a new one.
   * @returns The new (or provided) session ID.
   */
  startNewSession(sessionId?: string): string {
    this.currentSessionId = sessionId || uuidv4(); // Generate or use provided ID.
    console.log(`Started new logging session: ${this.currentSessionId}`);
    // Log session start event to general logs if available.
    if (this.generalLogsTable) {
      this.logGeneralMessage('INFO', 'VehicleLogger', `New session started: ${this.currentSessionId}`);
    }
    // Log the current state as the beginning of this new session.
    this.logInitialStateToDb();
    return this.currentSessionId;
  }

  /**
   * Returns a read-only copy of the logger's current internal understanding of the vehicle state.
   * @returns A readonly snapshot of the internal VehicleState.
   */
  getCurrentState(): Readonly<VehicleState> {
    // Return a copy to prevent external modification of the internal state.
    return { ...this.currentState };
  }

  /**
   * Returns the currently active session ID used for logging.
   * @returns The current session UUID string.
   */
  getCurrentSessionId(): string {
    return this.currentSessionId;
  }
}
