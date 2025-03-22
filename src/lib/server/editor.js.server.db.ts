"use server";

import { db } from "~/lib/server/db";
import {
  user as userDb,
  diaryEntry,
  diaryCategory,
  diaryWorkTableEntryCollaborator,
  diaryWorkTableEntryCollaborator_User as collaboratorUserRelation,
} from "~/lib/server/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import {
  DbDiaryEntry,
  DeleteDiaryEntryParamsSchema,
  GetDiaryEntryParamsSchema,
  SaveDiaryEntryContentParamsSchema,
  SaveDiaryEntryMetadataParamsSchema,
  SaveDiaryEntryTableDataParamsSchema
} from "~/lib/server/editor.js.server";

function revalidatePath(_path: string) {
  // Revalidate the path
}

export async function dbSaveDiaryEntryMetadata_server(
  params: z.infer<typeof SaveDiaryEntryMetadataParamsSchema>,
) {
  revalidatePath("/diary");

  const [result] = await db
    .update(diaryEntry)
    .set({
      title: params.newTitle.trim(),
      day: params.dayDate,
      published: params.published,
    })
    .where(eq(diaryEntry.id, params.diaryEntryId))
    .returning({
      id: diaryEntry.id,
      title: diaryEntry.title,
      day: diaryEntry.day,
      published: diaryEntry.published,
      createdAt: diaryEntry.createdAt,
    });

  return result;
}

export async function dbSaveDiaryEntryTableData_server(
  params: z.infer<typeof SaveDiaryEntryTableDataParamsSchema>
) {
  await db.transaction(async (tx) => {
    // Delete existing entries
    await tx
      .delete(diaryWorkTableEntryCollaborator)
      .where(eq(diaryWorkTableEntryCollaborator.diaryEntryId, params.diaryEntryId));

    // Insert new entries with workers
    if (params.workTableData.length > 0) {
      const collaborators = await tx
        .insert(diaryWorkTableEntryCollaborator)
        .values(
          params.workTableData.map((data) => ({
            diaryEntryId: params.diaryEntryId,
            workedAt: data.workedAt ?? new Date(),
            workedSeconds: data.workedSeconds,
            description: data.description,
          }))
        )
        .returning({ id: diaryWorkTableEntryCollaborator.id });

      await tx.insert(collaboratorUserRelation).values(
        params.workTableData.flatMap((data, index) =>
          data.workers.map((worker) => ({
            collaboratorId: collaborators[index].id,
            userId: worker.id,
          }))
        )
      );
    }
  });
}

export async function dbSaveDiaryEntryContent_server(
  authed: boolean,
  params: z.infer<typeof SaveDiaryEntryContentParamsSchema>
) {
  if (!authed) return { lastEditedTimestamp: 0, diaryEntry: null };

  const [result] = await db
    .update(diaryEntry)
    .set({ content: params.data })
    .where(eq(diaryEntry.id, params.diaryEntryId))
    .returning();

  revalidatePath("/diary");

  return result
    ? { lastEditedTimestamp: params.data.time, diaryEntry: result }
    : { lastEditedTimestamp: 0, diaryEntry: null };
}

export async function dbCreateDiaryEntry_server() {
  const newEntryId = crypto.randomUUID();

  // First check if "Unknown" category exists
  const unknownCategory = await db
    .select({ id: diaryCategory.id })
    .from(diaryCategory)
    .where(eq(diaryCategory.name, "Unknown"))
    .limit(1);

  let unknownCategoryId: number;

  if (unknownCategory.length === 0) {
    // Create it if it doesn't exist
    const [newCategory] = await db
      .insert(diaryCategory)
      .values({ name: "Unknown" })
      .returning({ id: diaryCategory.id });

    unknownCategoryId = newCategory.id;
  } else {
    unknownCategoryId = unknownCategory[0].id;
  }

  await db.insert(diaryEntry).values({
    id: newEntryId,
    title: "New Diary Entry " + new Date().toLocaleString(),
    content: JSON.stringify([{ type: "paragraph", content: [""] }]), // getDefaultContent(),
    published: false,
    diaryCategoryId: unknownCategoryId,
  });

  revalidatePath("/diary");
  return newEntryId;
}

export async function dbDeleteDiaryEntry_server(params: z.infer<typeof DeleteDiaryEntryParamsSchema>) {
  await db
    .delete(diaryEntry)
    .where(eq(diaryEntry.id, params.diaryEntryId));

  revalidatePath("/diary");
}

export async function dbReadDiaryEntries_server(authed: boolean) {
  const query = db
    .select({
      entry: diaryEntry,
      collaborator: diaryWorkTableEntryCollaborator,
      user: userDb,
    })
    .from(diaryEntry)
    .leftJoin(
      diaryWorkTableEntryCollaborator,
      eq(diaryEntry.id, diaryWorkTableEntryCollaborator.diaryEntryId)
    )
    .leftJoin(
      collaboratorUserRelation,
      eq(diaryWorkTableEntryCollaborator.id, collaboratorUserRelation.collaboratorId)
    )
    .leftJoin(userDb, eq(collaboratorUserRelation.userId, userDb.id))
    .orderBy(desc(diaryEntry.day));

  if (!authed) {
    const entries = await query.where(eq(diaryEntry.published, true));
    return { entries: groupEntries(entries), publicOnly: true as const };
  }

  const allEntries = await query;
  return { entries: groupEntries(allEntries), publicOnly: false as const };
}

export async function dbGetDiaryEntry_server(params: z.infer<typeof GetDiaryEntryParamsSchema>) {
  const result = await db
    .select({
      entry: diaryEntry,
      collaborator: diaryWorkTableEntryCollaborator,
      user: userDb,
    })
    .from(diaryEntry)
    .leftJoin(
      diaryWorkTableEntryCollaborator,
      eq(diaryEntry.id, diaryWorkTableEntryCollaborator.diaryEntryId)
    )
    .leftJoin(
      collaboratorUserRelation,
      eq(diaryWorkTableEntryCollaborator.id, collaboratorUserRelation.collaboratorId)
    )
    .leftJoin(userDb, eq(collaboratorUserRelation.userId, userDb.id))
    .where(eq(diaryEntry.id, params.diaryEntryId));

  return result.length > 0 ? groupEntries(result)[0] : null;
}

function groupEntries(rows: any[]): DbDiaryEntry[] {
  const entriesMap = new Map<string, DbDiaryEntry>();

  for (const row of rows) {
    const entry = row.entry;
    if (!entriesMap.has(entry.id)) {
      entriesMap.set(entry.id, {
        ...entry,
        workTableEntries: [],
      });
    }

    const currentEntry = entriesMap.get(entry.id)!;
    if (row.collaborator) {
      const existingCollaborator = currentEntry.workTableEntries.find(
        (c) => c.id === row.collaborator.id
      );

      if (!existingCollaborator) {
        currentEntry.workTableEntries.push({
          ...row.collaborator,
          workers: row.user ? [row.user] : [],
        });
      } else if (row.user) {
        existingCollaborator.workers.push(row.user);
      }
    }
  }

  return Array.from(entriesMap.values());
}

export async function dbDiaryEntryGetWorkers_server(authed: boolean) {
  if (!authed) return [];

  return db
    .select({
      id: userDb.id,
      name: userDb.name,
      email: userDb.email,
    })
    .from(userDb)
    .orderBy(userDb.email);
}
