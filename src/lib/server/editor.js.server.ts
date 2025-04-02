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
  getAllUserInformation_server,
  getDiaryOwner,
} from "~/lib/server/editor.js.server.db";
import { hasPermission } from "~/lib/server/permissions";
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
    const user = req.context.user;
    const diaryOwner = await getDiaryOwner(req.data.diaryEntryId);
    const hasPermEditDiary = hasPermission("edit:diary", user);
    const hasPermEditOwnDiary =
      hasPermission("editOwn:diary", user) && user.id === diaryOwner;

    if (hasPermEditDiary || hasPermEditOwnDiary) {
      const res = await dbSaveDiaryEntryMetadata_server(req.data);
      return { success: true, data: res };
    } else {
      return {
        success: false,
        reason: "Permission denied",
      };
    }
  });

export const dbSaveDiaryEntryTableData = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryTableDataParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    const diaryOwner = await getDiaryOwner(req.data.diaryEntryId);
    const hasPermEditDiary = hasPermission("edit:diary", user);
    const hasPermEditOwnDiary =
      hasPermission("editOwn:diary", user) && user.id === diaryOwner;

    if (hasPermEditDiary || hasPermEditOwnDiary) {
      await dbSaveDiaryEntryTableData_server(req.data);
      return { success: true };
    } else {
      return {
        success: false,
        reason: "Permission denied",
      };
    }
  });

export const dbSaveDiaryEntryContent = createServerFn({ method: "POST" })
  .validator(SaveDiaryEntryContentParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    const diaryOwner = await getDiaryOwner(req.data.diaryEntryId);
    const hasPermEditDiary = hasPermission("edit:diary", user);
    const hasPermEditOwnDiary =
      hasPermission("editOwn:diary", user) && user.id === diaryOwner;

    if (hasPermEditDiary || hasPermEditOwnDiary) {
      const res = await dbSaveDiaryEntryContent_server(!!user, req.data);
      return { success: true, data: res };
    } else {
      return {
        success: false,
        reason: "Permission denied",
      };
    }
  });

export const dbCreateDiaryEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    const hasPermCreateDiary = hasPermission("create:diary", user);

    if (hasPermCreateDiary) {
      const res = await dbCreateDiaryEntry_server(user.id);
      return { success: true, data: res };
    } else {
      return {
        success: false,
        reason: "Permission denied",
      };
    }
  });

export const dbDeleteDiaryEntry = createServerFn({ method: "POST" })
  .validator(DeleteDiaryEntryParamsSchema)
  .middleware([authMiddleware])
  .handler(async (req) => {
    const user = req.context.user;
    const diaryOwner = await getDiaryOwner(req.data.diaryEntryId);
    const hasPermDeleteDiary = hasPermission("delete:diary", user);
    const hasPermDeleteOwnDiary =
      hasPermission("deleteOwn:diary", user) && user.id === diaryOwner;

    if (hasPermDeleteDiary || hasPermDeleteOwnDiary) {
      await dbDeleteDiaryEntry_server(req.data);
      return { success: true };
    } else {
      return {
        success: false,
        reason: "Permission denied",
      };
    }
  });

export const dbReadDiaryEntries = createServerFn({ method: "GET" })
  .middleware([authMiddlewareOptional])
  .handler(async (req) => {
    const user = req.context.user;

    const hasPermListDiary = hasPermission("list:diary", user);
    if (!hasPermListDiary) {
      return {
        success: false,
        reason: "Permission denied",
      };
    }

    const hasPermListAllEntriesFromDiary = hasPermission("listAll:diary", user);

    const res = await dbReadDiaryEntries_server(!hasPermListAllEntriesFromDiary);
    return { success: true, data: res };
  });

export const dbDiaryEntryGetWorkers = createServerFn({ method: "GET" })
  .middleware([authMiddlewareOptional])
  .handler(async (req) => {
    const user = req.context.user;

    const hasPermGetAllUserInformation = hasPermission("list:all-users", user);
    if (!hasPermGetAllUserInformation) {
      return {
        success: false,
        reason: "Permission denied",
      };
    }

    const res = await getAllUserInformation_server();
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
