import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware, authMiddlewareOptional } from "~/lib/middleware/auth-guard";
import {
  dbCreateDiaryEntry_server,
  dbDeleteDiaryEntry_server,
  dbReadDiaryEntries_server,
  dbSaveDiaryEntryContent_server,
  dbSaveDiaryEntryMetadata_server,
  dbSaveDiaryEntryTableData_server,
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

export type DiaryWorkTableEntryCollaboratorExtended = z.infer<
  typeof DiaryWorkTableEntryCollaboratorExtendedSchema
>;

export type DbDiaryEntry = typeof diaryEntry.$inferSelect & {
  workTableEntries: DiaryWorkTableEntryCollaboratorExtended[];
};

export const dbSaveDiaryEntryMetadata = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryMetadataParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const res = await dbSaveDiaryEntryMetadata_server(req.data);
    return { success: true, data: res };
  });

export const dbSaveDiaryEntryTableData = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryTableDataParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    dbSaveDiaryEntryTableData_server(req.data);
  });

export const dbSaveDiaryEntryContent = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryContentParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;

    const res = await dbSaveDiaryEntryContent_server(!!user, req.data);
    return { success: true, data: res };
  });

export const dbCreateDiaryEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async () => {
    const res = await dbCreateDiaryEntry_server();
    return { success: true, data: res };
  });

export const dbDeleteDiaryEntry = createServerFn({ method: "POST" })
  .validator(DeleteDiaryEntryParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    await dbDeleteDiaryEntry_server(req.data);
    return { success: true };
  });

export const dbReadDiaryEntries = createServerFn({ method: "POST" })
  .middleware([authMiddlewareOptional])
  .handler(async (req) => {
    const user = req.context.user;
    const res = await dbReadDiaryEntries_server(!!user);
    return { success: true, data: res };
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
