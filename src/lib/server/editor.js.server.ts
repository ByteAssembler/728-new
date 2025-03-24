import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "~/lib/middleware/auth-guard";

import { eq } from "drizzle-orm";
import { db } from "~/lib/server/db";
import {
  diaryCategory as dbSchemaDiaryCategory,
  diaryEntry as dbSchemaDiaryEntry,
  user as dbSchemaUser,
} from "~/lib/server/schema";

/*
function createAuthedPostServerFn<Z extends z.ZodType<unknown, z.ZodTypeDef, unknown>>
  (
    schema: Z,
    fn: (req: z.infer<Z>) => Promise<unknown>
  ) {
  return createServerFn({ method: "POST" })
    .validator(schema)
    .middleware([authMiddleware])
    .handler(async (req) => {
      const user = req.context.user;
      if (!user) {
        throw new Error("Unauthorized");
      } else {
        await fn(req);
      }
    })
}

export const dbSaveDiaryEntryMetadata = createAuthedPostServerFn(dbSaveDiaryEntryMetadataSchema, async (req) => {
  console.log("dbSaveDiaryEntryMetadata", req.dayDate);
  return { success: true };
});
*/

const dbSaveDiaryEntryMetadataSchema = z.object({
  diaryEntryId: z.string(),
  newTitle: z.string(),
  dayDate: z.date(),
  published: z.boolean(),
});

export const dbSaveDiaryEntryMetadata = createServerFn({ method: "POST" })
  .validator(dbSaveDiaryEntryMetadataSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    } else {
      return { success: true };
    }
  });

export const dbDiaryEntryGetWorkers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await db
      .select({
        id: dbSchemaUser.id,
        name: dbSchemaUser.name,
        email: dbSchemaUser.email,
      })
      .from(dbSchemaUser);
  });

const dbGetDiaryEntrySchema = z.string();

export const dbGetDiaryEntry = createServerFn({ method: "POST" })
  .validator(dbGetDiaryEntrySchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
    }

    const a = await db.query.diaryEntry.findFirst({
      where: eq(dbSchemaDiaryEntry.id, req.data),
      with: {},
    });

    return a;
  });

export const dbCreateDiaryEntryServerFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
    }

    const categoryId_ = await db
      .select({
        id: dbSchemaDiaryCategory.id,
      })
      .from(dbSchemaDiaryCategory)
      .limit(1)
      .execute();

    let categoryId = categoryId_.length > 0 ? categoryId_[0].id : null;

    if (!categoryId) {
      const res = await db
        .insert(dbSchemaDiaryCategory)
        .values({
          name: "Unknown",
        })
        .returning({
          id: dbSchemaDiaryCategory.id,
        })
        .execute();

      categoryId = res[0].id;
    }

    const res = await db
      .insert(dbSchemaDiaryEntry)
      .values({
        id: crypto.randomUUID(), // Generate a unique ID
        title: "New Diary Entry " + new Date().toLocaleString(),
        content: "",
        published: false,
        diaryCategoryId: categoryId,
        day: new Date(),
      })
      .returning({
        id: dbSchemaDiaryEntry.id,
      })
      .execute();

    return res[0].id;
  });

/*
function getDefaultContent() {
  const now = new Date();

  return {
    time: 0,
    blocks: [
      {
        id: "QermI4- BWt",
        type: "header",
        data: {
          text: "Diary Entry from " + now.toLocaleDateString(),
          level: 3,
        },
      },
      {
        id: "8cD_ilZ20j",
        type: "paragraph",
        data: {
          text: "Bla Bla Bla...",
        },
      },
    ],
    version: "2.30.7",
  };
}
*/
