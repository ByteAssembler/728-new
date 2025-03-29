import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  json,
  primaryKey,
  pgEnum,
  index
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { relations } from "drizzle-orm";

export const diaryWorkTableEntryCollaborator = pgTable("WorkTableCollaborator", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  workedAt: timestamp("worked_at").defaultNow(),
  workedSeconds: integer("worked_seconds").notNull(),
  diaryEntryId: text("diary_entry_id")
    .notNull()
    .references(() => diaryEntry.id, { onDelete: "cascade" }), // ADD CASCADE
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const diaryCategory = pgTable("DiaryCategory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const diaryEntry = pgTable("DiaryEntry", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  contentJson: text("content_json").notNull(),
  contentHtml: text("content_html"),
  published: boolean("published").default(false).notNull(),
  diaryCategoryId: integer("diary_category_id")
    .notNull()
    .references(() => diaryCategory.id, { onDelete: "restrict" }), // PREVENT CATEGORY DELETION
  day: timestamp("day").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  dayIdx: index("day_idx").on(table.day),
  publishedIdx: index("published_idx").on(table.published),
}));

export const logLevelEnum = pgEnum("log_level", ["DEBUG", "INFO", "WARN", "ERROR"] as const);

export const logs = pgTable("Logs", {
  id: serial("id").primaryKey(),
  component: text("component").notNull(),
  level: logLevelEnum("level").notNull(),
  message: text("message").notNull(),
  simplifiedMessage: text("simplified_message"),
  details: json("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Many‑to‑Many Relation: DiaryWorkTableEntryCollaborator <-> User
export const diaryWorkTableEntryCollaborator_User = pgTable("Collaborators", {
  collaboratorId: integer("collaborator_id")
    .notNull()
    .references(() => diaryWorkTableEntryCollaborator.id, { onDelete: "cascade" }), // ADD CASCADE
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // ADD CASCADE
}, (t) => [
  primaryKey({ columns: [t.collaboratorId, t.userId] })
]);

// Define relations for diaryCategory: one-to-many with diaryEntry
export const diaryCategoryRelations = relations(diaryCategory, ({ many }) => ({
  diaryEntries: many(diaryEntry),
}));

// Define relations for diaryEntry: one-to-one with diaryCategory and one-to-many with diaryWorkTableEntryCollaborator
export const diaryEntryRelations = relations(diaryEntry, ({ one, many }) => ({
  category: one(diaryCategory, {
    fields: [diaryEntry.diaryCategoryId],
    references: [diaryCategory.id],
  }),
  collaborators: many(diaryWorkTableEntryCollaborator),
}));

// Define relations for diaryWorkTableEntryCollaborator: one-to-one with diaryEntry and many-to-many with user via join table
export const diaryWorkTableEntryCollaboratorRelations = relations(diaryWorkTableEntryCollaborator, ({ one, many }) => ({
  diaryEntry: one(diaryEntry, {
    fields: [diaryWorkTableEntryCollaborator.diaryEntryId],
    references: [diaryEntry.id],
  }),
  users: many(diaryWorkTableEntryCollaborator_User),
}));

// Define relations for the join table: one-to-one to diaryWorkTableEntryCollaborator and one-to-one to user
export const diaryWorkTableEntryCollaborator_UserRelations = relations(diaryWorkTableEntryCollaborator_User, ({ one }) => ({
  collaborator: one(diaryWorkTableEntryCollaborator, {
    fields: [diaryWorkTableEntryCollaborator_User.collaboratorId],
    references: [diaryWorkTableEntryCollaborator.id],
  }),
  user: one(user, {
    fields: [diaryWorkTableEntryCollaborator_User.userId],
    references: [user.id],
  }),
}));
