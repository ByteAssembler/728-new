import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useDebouncedCallback } from "use-debounce";

export default function EditorComponent({
  defaultData,
  onDataChange,
}: {
  defaultData?: string;
  onDataChange: (dataJsonString: string, dataHtmlString: string) => void;
}) {
  const editor = useCreateBlockNote({
    initialContent: defaultData
      ? JSON.parse(defaultData)
      : [{ type: "paragraph", content: ["..."] }],
  });

  const handleChange = async () => {
    const blocks = editor.document;
    const jsonContent = JSON.stringify(blocks);
    const htmlContent = await editor.blocksToFullHTML(blocks);
    console.log(jsonContent, htmlContent, blocks); // remove
    onDataChange(jsonContent, htmlContent);
  };

  const debouncedSave = useDebouncedCallback(() => handleChange(), 500, {
    maxWait: 2000,
  });

  return <BlockNoteView editor={editor} onChange={debouncedSave} />;
}
