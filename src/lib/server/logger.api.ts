import { format } from 'date-fns'; // Beliebte Bibliothek zur Datumsformatierung, Alternative unten

// --- Typdefinitionen für Klarheit und Typsicherheit ---

export type WallPosition = 'front' | 'left' | 'right' | 'back' | 'none';
export type CardColor = 'red' | 'blue' | 'none';
export type VehiclePosition = 'start' | 'field' | 'end';
export type BrightnessLevel = 'dark' | 'bright' | 'none';
export type CardAction = 'pick up' | 'discard' | 'none';
export type DriveDirection = 'forward' | 'backward' | 'right' | 'left' | 'stop';
export type LightState = 'ON' | 'OFF';
export type VehicleStatus = 'ON' | 'READY' | 'auto' | 'manual';

// Interface für den vollständigen Fahrzeugzustand (intern verwendet)
interface VehicleState {
  WALL: WallPosition;
  CARD: CardColor;
  POSITION: VehiclePosition;
  BRIGHTNESS: BrightnessLevel;
  MOVING_CARD: CardAction;
  DRIVE: DriveDirection;
  LIGHT: LightState;
  AKKU: number; // Intern als Zahl speichern für Vergleiche
  STATUS: VehicleStatus;
}

// Interface für das minimale Log-Payload (was an die API gesendet wird)
// Partial macht alle Properties optional. Wir fügen TIMESTAMP hinzu.
// AKKU wird als String gesendet.
type LogPayload = Partial<Omit<VehicleState, 'AKKU'> & { AKKU: string }> & {
  TIMESTAMP: string;
};


// --- Die Helperklasse ---

export class VehicleLogger {
  private apiUrl: string;
  private currentState: VehicleState;
  private isSending: boolean = false; // Einfacher Lock, um konkurrierende Sends zu vermeiden
  private queue: LogPayload[] = []; // Warteschlange für Logs während des Sendens

  /**
   * Erstellt eine Instanz des VehicleLoggers.
   * @param apiUrl Die URL des REST-API-Endpunkts.
   * @param initialState Optionaler Anfangszustand des Fahrzeugs.
   */
  constructor(apiUrl: string, initialState?: Partial<VehicleState>) {
    if (!apiUrl) {
      throw new Error("API URL must be provided.");
    }
    this.apiUrl = apiUrl;

    // Initialisiere den Zustand mit Standardwerten oder übergebenen Werten
    this.currentState = {
      WALL: 'none',
      CARD: 'none',
      POSITION: 'start', // Annahme: Startet typischerweise auf dem Startfeld
      BRIGHTNESS: 'none', // Annahme: Helligkeit anfangs unbekannt
      MOVING_CARD: 'none',
      DRIVE: 'stop',
      LIGHT: 'OFF',
      AKKU: 100, // Annahme: Startet mit vollem Akku
      STATUS: 'ON', // Annahme: Wird eingeschaltet
      ...initialState, // Überschreibe Defaults mit initialState, falls vorhanden
    };

    console.log("VehicleLogger initialized with state:", this.currentState);
    // Optional: Sende initialen Zustand beim Start? Hängt von den Anforderungen ab.
    // this.sendLog(this.currentState); // Würde den kompletten Zustand senden
  }

  /**
   * Formatiert das aktuelle Datum und die Uhrzeit gemäß den Anforderungen.
   * Verwendet date-fns oder eine manuelle Implementierung.
   */
  private getFormattedTimestamp(): string {
    // Verwendung von date-fns (empfohlen):
    // Benötigt: npm install date-fns oder yarn add date-fns
    try {
      return format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    } catch {
      console.warn("date-fns not available or failed, using manual formatting.");
      // Manuelle Alternative (weniger robust bzgl. Locales etc.)
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Monat ist 0-indiziert
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
  }

  /**
   * Interne Methode zum Verarbeiten und Senden von Log-Daten.
   * @param changes Ein Objekt, das nur die geänderten Key-Value-Paare enthält.
   */
  private async processAndSend(changes: Partial<VehicleState>): Promise<void> {
    // Ignoriere leere Änderungen
    if (Object.keys(changes).length === 0) {
      return;
    }

    // Erstelle das Payload mit Zeitstempel und geänderten Werten
    const payload: LogPayload = {
      TIMESTAMP: this.getFormattedTimestamp(),
    };

    // Füge geänderte Werte hinzu, konvertiere AKKU zu String
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const typedKey = key as keyof VehicleState;
        if (typedKey === 'AKKU') {
          payload.AKKU = String(changes[typedKey]);
        } else {
          // Stelle sicher, dass der Typ korrekt zugewiesen wird
          (payload as any)[typedKey] = changes[typedKey];
        }
      }
    }

    // Füge Payload zur Warteschlange hinzu
    this.queue.push(payload);
    // Starte den Sendevorgang, wenn nicht bereits aktiv
    if (!this.isSending) {
      this.sendNextInQueue();
    }
  }

  /**
  * Sendet das nächste Element in der Warteschlange an die API.
  */
  private async sendNextInQueue(): Promise<void> {
    if (this.queue.length === 0 || this.isSending) {
      return; // Nichts zu senden oder bereits beschäftigt
    }

    this.isSending = true;
    const payloadToSend = this.queue.shift(); // Nimm das älteste Element

    if (!payloadToSend) {
      this.isSending = false;
      return;
    }

    const bodyJson = JSON.stringify(payloadToSend);

    console.log(`Sending log to ${this.apiUrl}:`, bodyJson);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyJson,
      });

      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}. Payload:`, bodyJson);
        try {
          const errorBody = await response.text();
          console.error(`API Response Body: ${errorBody}`);
        } catch {
          console.error(`Could not read error response body.`);
        }
        // Optional: Fehlerbehandlung (z.B. Payload zurück in die Queue legen für Retry?)
        // this.queue.unshift(payloadToSend); // Einfacher Retry (kann zu Loops führen!)
      } else {
        console.log("Log sent successfully.");
      }
    } catch (error) {
      console.error("Failed to send log due to network or other error:", error);
      // Optional: Fehlerbehandlung (z.B. Payload zurück in die Queue legen für Retry?)
      // this.queue.unshift(payloadToSend); // Einfacher Retry
    } finally {
      this.isSending = false;
      // Direkt das nächste Element senden, falls vorhanden
      this.sendNextInQueue();
    }
  }

  // --- Öffentliche Methoden zum Loggen von Änderungen ---

  logWallDetection(wall: WallPosition): void {
    if (this.currentState.WALL !== wall) {
      console.debug(`WALL change: ${this.currentState.WALL} -> ${wall}`);
      this.currentState.WALL = wall;
      this.processAndSend({ WALL: wall });
    }
  }

  logCardDetection(card: CardColor): void {
    if (this.currentState.CARD !== card) {
      console.debug(`CARD change: ${this.currentState.CARD} -> ${card}`);
      this.currentState.CARD = card;
      this.processAndSend({ CARD: card });
    }
  }

  logPositionChange(position: VehiclePosition): void {
    if (this.currentState.POSITION !== position) {
      console.debug(`POSITION change: ${this.currentState.POSITION} -> ${position}`);
      this.currentState.POSITION = position;
      this.processAndSend({ POSITION: position });
    }
  }

  logBrightnessChange(brightness: BrightnessLevel): void {
    if (this.currentState.BRIGHTNESS !== brightness) {
      console.debug(`BRIGHTNESS change: ${this.currentState.BRIGHTNESS} -> ${brightness}`);
      this.currentState.BRIGHTNESS = brightness;
      this.processAndSend({ BRIGHTNESS: brightness });
    }
  }

  /**
   * Loggt eine Kartenaktion (aufnehmen/ablegen).
   * WICHTIG: Nach Abschluss der Aktion muss der Aufrufer diese Methode
   * erneut mit 'none' aufrufen, um den Zustand zurückzusetzen!
   */
  logCardAction(action: CardAction): void {
    if (this.currentState.MOVING_CARD !== action) {
      console.debug(`MOVING_CARD change: ${this.currentState.MOVING_CARD} -> ${action}`);
      this.currentState.MOVING_CARD = action;
      this.processAndSend({ MOVING_CARD: action });
    }
  }

  logDrive(direction: DriveDirection): void {
    if (this.currentState.DRIVE !== direction) {
      console.debug(`DRIVE change: ${this.currentState.DRIVE} -> ${direction}`);
      this.currentState.DRIVE = direction;
      this.processAndSend({ DRIVE: direction });
    }
  }

  logLightState(state: LightState): void {
    if (this.currentState.LIGHT !== state) {
      console.debug(`LIGHT change: ${this.currentState.LIGHT} -> ${state}`);
      this.currentState.LIGHT = state;
      this.processAndSend({ LIGHT: state });
    }
  }

  /**
   * Loggt den Akkustand. Sendet nur bei Änderung.
   * @param level Akkustand in Prozent (0-100). Wird intern gerundet.
   */
  logAkkuLevel(level: number): void {
    const clampedLevel = Math.max(0, Math.min(100, Math.round(level)));
    if (this.currentState.AKKU !== clampedLevel) {
      console.debug(`AKKU change: ${this.currentState.AKKU}% -> ${clampedLevel}%`);
      this.currentState.AKKU = clampedLevel;
      this.processAndSend({ AKKU: clampedLevel }); // processAndSend konvertiert zu String
    }
  }

  logStatusChange(status: VehicleStatus): void {
    if (this.currentState.STATUS !== status) {
      console.debug(`STATUS change: ${this.currentState.STATUS} -> ${status}`);
      this.currentState.STATUS = status;
      this.processAndSend({ STATUS: status });
    }
  }

  /**
   * Gibt den aktuellen internen Zustand zurück (nützlich für Debugging).
   */
  getCurrentState(): Readonly<VehicleState> {
    return { ...this.currentState };
  }
}

// --- Beispiel für die Verwendung ---

/*
// Ersetze dies durch die tatsächliche API-URL
const API_ENDPOINT = "http://deine-api-adresse.com/log"; // Beispiel

// Logger instanziieren
const logger = new VehicleLogger(API_ENDPOINT, { AKKU: 95, STATUS: 'READY' });

// Simulation von Ereignissen
logger.logStatusChange('auto'); // Sendet: { TIMESTAMP: "...", STATUS: "auto" }
logger.logDrive('forward');    // Sendet: { TIMESTAMP: "...", DRIVE: "forward" }
logger.logAkkuLevel(94.5);     // Sendet: { TIMESTAMP: "...", AKKU: "95" } // Wird auf 95 gerundet, keine Änderung -> kein Senden
logger.logAkkuLevel(94);       // Sendet: { TIMESTAMP: "...", AKKU: "94" }
logger.logWallDetection('front'); // Sendet: { TIMESTAMP: "...", WALL: "front" }
logger.logWallDetection('none');  // Sendet: { TIMESTAMP: "...", WALL: "none" }
logger.logDrive('stop');       // Sendet: { TIMESTAMP: "...", DRIVE: "stop" }

// Beispiel für Kartenaktion
logger.logCardDetection('red');   // Sendet: { TIMESTAMP: "...", CARD: "red" }
logger.logCardAction('pick up'); // Sendet: { TIMESTAMP: "...", MOVING_CARD: "pick up" }
// ... Fahrzeug nimmt Karte auf ...
logger.logCardAction('none');    // WICHTIG: Zurücksetzen! Sendet: { TIMESTAMP: "...", MOVING_CARD: "none" }
logger.logCardDetection('none'); // Karte ist weg. Sendet: { TIMESTAMP: "...", CARD: "none" }

// Licht anschalten
logger.logLightState('ON');      // Sendet: { TIMESTAMP: "...", LIGHT: "ON" }
*/
