// src/db/schema.ts (or your actual schema file path)
// No changes needed here based on the request, just providing context.

import { pgTable, serial, timestamp, text, integer, uuid, real, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// --- Type Definitions (Exported for use in other files) ---
export type WallPosition = 'front' | 'left' | 'right' | 'back' | 'none';
export type CardColor = 'red' | 'blue' | 'none';
export type VehiclePosition = 'start' | 'field' | 'end';
export type BrightnessLevel = 'dark' | 'bright' | 'none';
export type CardAction = 'pick up' | 'discard' | 'none';
export type DriveDirection = 'forward' | 'backward' | 'right' | 'left' | 'stop';
export type LightState = 'ON' | 'OFF';
export type VehicleStatus = 'ON' | 'READY' | 'auto' | 'manual';

// --- Enums for Database Constraints/Types ---
export const logLevelEnum = pgEnum("log_level", ["DEBUG", "INFO", "WARN", "ERROR"] as const);
export const triggerSourceEnum = pgEnum('trigger_source_enum', ['AUTO', 'MANUAL', 'SENSOR', 'SYSTEM']); // Enum including 'SYSTEM'

// --- Database Table Definitions ---

// Detailed log table for specific vehicle behavior events.
export const vehicleBehaviorLogsTable = pgTable('vehicle_behavior_logs', {
  id: serial('id').primaryKey(),
  // Unique ID for a "drive" or "session" to group related logs.
  sessionId: uuid('session_id'),
  // Timestamp of the logged event.
  timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }).notNull().defaultNow(),

  // --- Core fields (mirroring API requirements, but nullable as not every log event changes every field) ---
  wall: text('wall', { enum: ['front', 'left', 'right', 'back', 'none'] }),
  card: text('card', { enum: ['red', 'blue', 'none'] }),
  position: text('position', { enum: ['start', 'field', 'end'] }),
  brightness: text('brightness', { enum: ['dark', 'bright', 'none'] }),
  movingCard: text('moving_card', { enum: ['pick up', 'discard', 'none'] }),
  drive: text('drive', { enum: ['forward', 'backward', 'right', 'left', 'stop'] }),
  light: text('light', { enum: ['ON', 'OFF'] }),
  akku: integer('akku'), // Battery level stored as number (0-100).
  status: text('status', { enum: ['ON', 'READY', 'auto', 'manual'] }),

  // --- Additional useful fields (Examples for detailed local logging) ---

  // Raw sensor data examples
  distanceFrontCm: real('distance_front_cm'), // Actual distance sensor reading (front).
  distanceLeftCm: real('distance_left_cm'),   // Actual distance sensor reading (left).
  distanceRightCm: real('distance_right_cm'), // Actual distance sensor reading (right).
  distanceBackCm: real('distance_back_cm'),   // Actual distance sensor reading (back).
  lightSensorRaw: integer('light_sensor_raw'), // Raw value from the light sensor.

  // Mechanics/Actuator details examples
  motorLeftPower: real('motor_left_power'), // Power level sent to the left motor (e.g., -1 to 1).
  motorRightPower: real('motor_right_power'), // Power level sent to the right motor (e.g., -1 to 1).
  gripperStatus: text('gripper_status'), // e.g., 'OPEN', 'CLOSED', 'HOLDING_RED', 'HOLDING_BLUE'

  // Logic/State context examples
  currentTask: text('current_task'), // What the vehicle is currently trying to achieve (e.g., 'SEARCHING', 'DELIVERING').
  errorCode: text('error_code'),    // Specific error code if an error occurred (e.g., 'GRIPPER_FAIL', 'MOTOR_STALL').
  triggerSource: triggerSourceEnum('trigger_source'), // What triggered this event (Sensor input, Manual command, Autonomous logic, System event).

  // Optional relation to a general log entry
  // relatedLogId: integer('related_log_id').references(() => logs.id),

  // Flexible storage for any other metadata (JSONB preferred in Postgres).
  metadata: jsonb('metadata'),
});

// Derived type for inserting new rows into vehicleBehaviorLogsTable.
export type NewVehicleBehaviorLog = typeof vehicleBehaviorLogsTable.$inferInsert;

// Existing general-purpose log table (for application-level logs).
export const logs = pgTable("Logs", {
  id: serial("id").primaryKey(),
  component: text("component").notNull(),
  level: logLevelEnum("level").notNull(), // References the log level enum.
  message: text("message").notNull(),
  simplifiedMessage: text("simplified_message"),
  details: jsonb("details"), // JSONB is often preferred over JSON in Postgres.
  createdAt: timestamp("created_at", { mode: 'date', withTimezone: true }).defaultNow().notNull(),
});
