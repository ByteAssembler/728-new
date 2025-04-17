import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";

import { useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useDebouncedCallback } from "use-debounce";

import { generateFileStorageServerPresignedUploadUrl } from "~/lib/server/editor.js.server.blob";

export function EditorComponent({
  defaultData,
  onDataChange,
}: {
  defaultData?: string;
  onDataChange: (dataJsonString: string, dataHtmlString: string) => void;
}) {
  const generateUploadUrl = useServerFn(generateFileStorageServerPresignedUploadUrl);

  const handleUpload = useCallback(async (file: File): Promise<string> => {
    if (!generateUploadUrl) return Promise.reject("Server function not available");

    try {
      const result = await generateUploadUrl({
        data: {
          fileName: file.name,
          fileType: file.type,
        }
      });

      const { uploadUrl, publicUrl } = result;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Failed to upload file " + file.name + ":", uploadResponse.status, errorText);
        throw new Error(`Failed to upload file ${file.name}: ${uploadResponse.statusText} - ${errorText}`);
      }

      console.log("File " + file.name + " uploaded successfully!");
      return publicUrl;

    } catch (error) {
      console.error("Upload process failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Upload failed: ${errorMessage}`);
      throw error;
    }
  }, [generateUploadUrl]);

  const editor = useCreateBlockNote({
    initialContent: defaultData
      ? (JSON.parse(defaultData) as PartialBlock[])
      : [{ type: "paragraph", content: "..." }],
    uploadFile: handleUpload,
  });

  const handleChange = useCallback(async () => {
    if (!editor) return;
    const blocks = editor.document;
    const jsonContent = JSON.stringify(blocks, null, 2);
    const htmlContent = await editor.blocksToFullHTML(blocks);
    onDataChange(jsonContent, htmlContent);
  }, [editor, onDataChange]);

  const debouncedSave = useDebouncedCallback(handleChange, 500, {
    maxWait: 2000,
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={debouncedSave}
      filePanel={true}
    />
  );
}
