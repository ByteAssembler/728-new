"use server";

import { db } from "~/lib/server/db";
import {
  user as userDb,
  diaryEntry,
  diaryCategory,
  diaryWorkTableEntryCollaborator,
  diaryWorkTableEntryCollaborator_User as collaboratorUserRelation,
} from "~/lib/server/schema";
import { eq, desc, inArray } from "drizzle-orm";
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
    // New deletion: First, get the existing work table entry collaborator ids.
    const existingCollaborators = await tx
      .select({ id: diaryWorkTableEntryCollaborator.id })
      .from(diaryWorkTableEntryCollaborator)
      .where(eq(diaryWorkTableEntryCollaborator.diaryEntryId, params.diaryEntryId));

    const collaboratorIds = existingCollaborators.map((item) => item.id);

    // Delete dependent Collaborators rows if any exist.
    if (collaboratorIds.length) {
      await tx
        .delete(collaboratorUserRelation)
        .where(inArray(collaboratorUserRelation.collaboratorId, collaboratorIds));
    }

    // Then delete the work table collaborator entries.
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

  const updateValues: Partial<typeof diaryEntry> = {};
  if (params.dataJson !== undefined) {
    updateValues.contentJson = params.dataJson;
  }
  if (params.dataHtml !== undefined) {
    updateValues.contentHtml = params.dataHtml;
  }
  if (Object.keys(updateValues).length === 0) {
    throw new Error("No values to set");
  }

  const [result] = await db
    .update(diaryEntry)
    .set(updateValues)
    .where(eq(diaryEntry.id, params.diaryEntryId))
    .returning();

  revalidatePath("/diary");

  return result
    ? { diaryEntry: result }
    : { diaryEntry: null };
}

export async function dbCreateDiaryEntry_server() {
  const newEntryId = await db.transaction(async (tx) => {
    const newEntryId = crypto.randomUUID();
    // Retrieve or create the "Unknown" category in a single transaction
    const unknownCategoryRows = await tx
      .select({ id: diaryCategory.id })
      .from(diaryCategory)
      .where(eq(diaryCategory.name, "Unknown"))
      .limit(1);
    let unknownCategoryId: number;
    if (unknownCategoryRows.length === 0) {
      const [newCategory] = await tx
        .insert(diaryCategory)
        .values({ name: "Unknown" })
        .returning({ id: diaryCategory.id });
      unknownCategoryId = newCategory.id;
    } else {
      unknownCategoryId = unknownCategoryRows[0].id;
    }
    // Insert the new diary entry inside the transaction
    await tx.insert(diaryEntry).values({
      id: newEntryId,
      title: "New Diary Entry " + new Date().toLocaleString(),
      contentJson: JSON.stringify([{ type: "paragraph", content: [""] }]),
      published: false,
      diaryCategoryId: unknownCategoryId,
    });
    return newEntryId;
  });
  revalidatePath("/diary"); // Perform revalidation after transaction commit
  return newEntryId;
}

export async function dbDeleteDiaryEntry_server(params: z.infer<typeof DeleteDiaryEntryParamsSchema>) {
  await db.transaction(async (tx) => {
    // Delete dependent collaborator rows using a subquery for Work Table Entry IDs
    const workTableIds = (
      await tx
        .select({ id: diaryWorkTableEntryCollaborator.id })
        .from(diaryWorkTableEntryCollaborator)
        .where(eq(diaryWorkTableEntryCollaborator.diaryEntryId, params.diaryEntryId))
    ).map(item => item.id);

    if (workTableIds.length) {
      await tx
        .delete(collaboratorUserRelation)
        .where(inArray(collaboratorUserRelation.collaboratorId, workTableIds));
    }

    // Delete work table entries
    await tx
      .delete(diaryWorkTableEntryCollaborator)
      .where(eq(diaryWorkTableEntryCollaborator.diaryEntryId, params.diaryEntryId));

    // Delete the diary entry itself
    await tx.delete(diaryEntry).where(eq(diaryEntry.id, params.diaryEntryId));
  });
  revalidatePath("/diary"); // Revalidate after transaction commit
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
