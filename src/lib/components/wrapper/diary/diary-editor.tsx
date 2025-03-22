import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useDebounce } from "@uidotdev/usehooks";

export default function EditorComponent(
  { defaultData, onDataChange }: { defaultData?: string; onDataChange: (data: string) => void },
) {
  const editor = useCreateBlockNote({
    initialContent: defaultData ? JSON.parse(defaultData) : [{ type: "paragraph", content: ["..."] }],
  });

  const handleChange = async () => {
    const blocks = editor.document;
    const jsonContent = JSON.stringify(blocks);
    console.log(jsonContent, blocks); // remove
    onDataChange(jsonContent);
  };

  const debouncedSave = useDebounce(handleChange, 1000);

  return <BlockNoteView editor={editor} onChange={debouncedSave} />;
}
