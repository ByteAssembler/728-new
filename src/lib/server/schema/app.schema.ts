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
}, (t) => ({
  pk: primaryKey(t.collaboratorId, t.userId)
}));
