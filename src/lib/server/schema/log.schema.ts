import { pgTable, serial, timestamp, text, integer } from 'drizzle-orm/pg-core';

export type WallPosition = 'front' | 'left' | 'right' | 'back' | 'none';
export type CardColor = 'red' | 'blue' | 'none';
export type VehiclePosition = 'start' | 'field' | 'end';
export type BrightnessLevel = 'dark' | 'bright' | 'none';
export type CardAction = 'pick up' | 'discard' | 'none';
export type DriveDirection = 'forward' | 'backward' | 'right' | 'left' | 'stop';
export type LightState = 'ON' | 'OFF';
export type VehicleStatus = 'ON' | 'READY' | 'auto' | 'manual';

export const Logs = pgTable('vehicle_logs', {
  id: serial('id').primaryKey(),
  // Speichere den Timestamp als richtigen DB-Timestamp
  timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }).notNull(),

  // Speichere nur die Werte, die sich *bei diesem Event* geändert haben.
  // Mache die Felder nullable, da nicht jedes Event alle Felder ändert.
  wall: text('wall', { enum: ['front', 'left', 'right', 'back', 'none'] }), // Oder wallEnum('wall')
  card: text('card', { enum: ['red', 'blue', 'none'] }),
  position: text('position', { enum: ['start', 'field', 'end'] }),
  brightness: text('brightness', { enum: ['dark', 'bright', 'none'] }),
  movingCard: text('moving_card', { enum: ['pick up', 'discard', 'none'] }),
  drive: text('drive', { enum: ['forward', 'backward', 'right', 'left', 'stop'] }),
  light: text('light', { enum: ['ON', 'OFF'] }),
  akku: integer('akku'), // Speichere Akku als Zahl in der DB
  status: text('status', { enum: ['ON', 'READY', 'auto', 'manual'] }),
});

// Typ für einen neuen Logeintrag ableiten (nützlich)
export type NewVehicleLog = typeof Logs.$inferInsert;
