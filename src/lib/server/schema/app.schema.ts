import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  json,
  primaryKey,
  pgEnum
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const diaryWorkTableEntryCollaborator = pgTable("WorkTableCollaborator", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  workedAt: timestamp("worked_at").defaultNow(),
  workedSeconds: integer("worked_seconds").notNull(),
  diaryEntryId: text("diary_entry_id").notNull(),
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
  diaryCategoryId: integer("diary_category_id").notNull(),
  day: timestamp("day").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const logLevelEnum = pgEnum("log_level", ["DEBUG", "INFO", "WARN", "ERROR"]);

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
    .references(() => diaryWorkTableEntryCollaborator.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id)
}, (t) => ({
  pk: primaryKey(t.collaboratorId, t.userId)
}));
