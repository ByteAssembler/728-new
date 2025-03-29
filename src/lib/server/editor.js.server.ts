import { createServerFn } from "@tanstack/react-start";
import { authMiddleware, authMiddlewareOptional } from "~/lib/middleware/auth-guard";
import { z } from "zod";
import {
  dbSaveDiaryEntryMetadata_server,
  dbSaveDiaryEntryTableData_server,
  dbSaveDiaryEntryContent_server,
  dbCreateDiaryEntry_server,
  dbDeleteDiaryEntry_server,
  dbReadDiaryEntries_server,
  dbGetDiaryEntry_server,
  dbDiaryEntryGetWorkers_server,
} from "~/lib/server/editor.js.server.db";
import { diaryEntry } from "~/lib/server/schema";

export const SaveDiaryEntryMetadataParamsSchema = z.object({
  diaryEntryId: z.string(),
  newTitle: z.string(),
  dayDate: z.date(),
  published: z.boolean(),
});

export const DiaryWorkerSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
});

export const DiaryWorkTableEntryCollaboratorExtendedSchema = z.object({
  // String to number
  id: z.coerce.number(),
  workers: z.array(DiaryWorkerSchema),
  workedAt: z.date().nullable(),
  workedSeconds: z.number(),
  description: z.string(),
});

export const SaveDiaryEntryTableDataParamsSchema = z.object({
  diaryEntryId: z.string(),
  workTableData: z.array(DiaryWorkTableEntryCollaboratorExtendedSchema),
});

export const SaveDiaryEntryContentParamsSchema = z.object({
  dataJson: z.any(),
  dataHtml: z.any(),
  diaryEntryId: z.string(),
});

export const DeleteDiaryEntryParamsSchema = z.object({
  diaryEntryId: z.string(),
});

export const GetDiaryEntryParamsSchema = z.object({
  diaryEntryId: z.string(),
});

export const OutputDataSchema = z.object({
  time: z.number(),
  blocks: z.array(z.any()),
  version: z.string(),
});

export type DiaryWorker = z.infer<typeof DiaryWorkerSchema>;

export type DiaryWorkTableEntryCollaboratorExtended = z.infer<typeof DiaryWorkTableEntryCollaboratorExtendedSchema>;

export type DbDiaryEntry = typeof diaryEntry.$inferSelect & {
  workTableEntries: DiaryWorkTableEntryCollaboratorExtended[];
};

export const dbSaveDiaryEntryMetadata = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryMetadataParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    const res = await dbSaveDiaryEntryMetadata_server(req.data)
    return { success: true, data: res };
  });

export const dbSaveDiaryEntryTableData = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryTableDataParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    const res = await dbSaveDiaryEntryTableData_server(req.data)
    return { success: true, data: res };
  });

export const dbSaveDiaryEntryContent = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryContentParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    const res = await dbSaveDiaryEntryContent_server(!!user, req.data)
    return { success: true, data: res };
  });

export const dbCreateDiaryEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    const res = await dbCreateDiaryEntry_server()
    return { success: true, data: res };
  });

export const dbDeleteDiaryEntry = createServerFn({ method: "POST" })
  .validator(DeleteDiaryEntryParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    await dbDeleteDiaryEntry_server(req.data)
    return { success: true };
  });

export const dbReadDiaryEntries = createServerFn({ method: "POST" })
  .middleware([authMiddlewareOptional])
  .handler(async (req) => {
    const user = req.context.user;
    const res = await dbReadDiaryEntries_server(!!user)
    return { success: true, data: res };
  });

export const dbGetDiaryEntry = createServerFn({ method: "POST" })
  .validator(GetDiaryEntryParamsSchema)
  .handler(async (req) => {
    const res = await dbGetDiaryEntry_server(req.data)
    return { success: true, data: res };
  });

export const dbDiaryEntryGetWorkers = createServerFn({ method: "GET" })
  .middleware([authMiddlewareOptional])
  .handler(async (req) => {
    const user = req.context.user;
    if (!user) {
      throw new Error("Unauthorized");
      return { success: false };
    }

    const res = await dbDiaryEntryGetWorkers_server(!!user)
    return { success: true, data: res };
  });
