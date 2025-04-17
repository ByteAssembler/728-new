import { createServerFn } from "@tanstack/react-start";
import { Client } from "minio";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const FILE_STORAGE_SERVER_BUCKET_NAME =
  process.env.FILE_STORAGE_SERVER_BUCKET_NAME || "diary-blobs";
const FILE_STORAGE_SERVER_PUBLIC_URL_BASE =
  process.env.FILE_STORAGE_SERVER_PUBLIC_URL_BASE ||
  "https://filestorage.mission72aid.com";

const PRESIGNED_URL_EXPIRY_SECONDS = parseInt(
  process.env.FILE_STORAGE_SERVER_PRESIGNED_URL_EXPIRY_SECONDS || "900",
  10,
);

function initializeFileStorageServerClientIfNotExitsAndGetIt() {
  const FILE_STORAGE_SERVER_ENDPOINT =
    process.env.FILE_STORAGE_SERVER_ENDPOINT;
  const FILE_STORAGE_SERVER_USE_SSL =
    process.env.FILE_STORAGE_SERVER_USE_SSL == "true";
  const FILE_STORAGE_SERVER_REGION = process.env.FILE_STORAGE_SERVER_REGION;
  const FILE_STORAGE_SERVER_ACCESS_KEY =
    process.env.FILE_STORAGE_SERVER_ACCESS_KEY;
  const FILE_STORAGE_SERVER_SECRET_KEY =
    process.env.FILE_STORAGE_SERVER_SECRET_KEY;

  if (!FILE_STORAGE_SERVER_ENDPOINT) {
    throw new Error(
      "FATAL: Missing environment variable FILE_STORAGE_SERVER_ENDPOINT",
    );
  }

  if (globalThis.FileStorageServerClient) {
    return globalThis.FileStorageServerClient;
  }

  try {
    globalThis.FileStorageServerClient = new Client({
      endPoint: FILE_STORAGE_SERVER_ENDPOINT,
      useSSL: FILE_STORAGE_SERVER_USE_SSL,
      region: FILE_STORAGE_SERVER_REGION,
      accessKey: FILE_STORAGE_SERVER_ACCESS_KEY,
      secretKey: FILE_STORAGE_SERVER_SECRET_KEY,
    });
    console.log("FileStorageServer client initialized successfully.");
    return globalThis.FileStorageServerClient;
  } catch (initError) {
    console.error(
      "FATAL: Failed to initialize FileStorageServer client:",
      initError,
    );
    // throw new Error(`Failed to initialize FileStorageServer client: ${initError instanceof Error ? initError.message : String(initError)}`);
    return null;
  }
}

const fileInfoSchema = z.object({
  fileName: z.string().min(1, "File name cannot be empty"),
  fileType: z.string().min(1, "File type cannot be empty"),
});

export const generateFileStorageServerPresignedUploadUrl = createServerFn({
  method: "POST",
})
  .validator(fileInfoSchema)
  .handler(async ({ data }) => {
    const client = initializeFileStorageServerClientIfNotExitsAndGetIt();
    if (!client) {
      throw new Error(
        "FileStorageServer client could not be initialized or is not available.",
      );
    }

    const { fileName } = data;

    try {
      const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const objectName = `${uuidv4()}-${safeFileName}`;

      const uploadUrl = await client.presignedPutObject(
        FILE_STORAGE_SERVER_BUCKET_NAME,
        objectName,
        PRESIGNED_URL_EXPIRY_SECONDS,
      );

      const publicUrl =
        `${FILE_STORAGE_SERVER_PUBLIC_URL_BASE}/${FILE_STORAGE_SERVER_BUCKET_NAME}/${objectName}`;

      console.log(
        `Server Function: Generated URLs - uploadUrl=${uploadUrl}, publicUrl=${publicUrl}`,
      );

      return { uploadUrl, publicUrl };
    } catch (error) {
      console.error(
        "Server Function: Error generating upload presigned URL. Full Error:",
        error,
      );
      throw new Error(`Failed to generate presigned URL`);
    }
  });

export type GenerateFileStorageServerPresignedUrlInput = z.infer<
  typeof fileInfoSchema
>;
export type GenerateFileStorageServerPresignedUrlOutput = {
  uploadUrl: string;
  publicUrl: string;
};

declare global {
  // eslint-disable-next-line no-var
  var FileStorageServerClient: Client | undefined;

  // interface globalThis {
  //   FileStorageServerClient: Client | undefined;
  // }
}
