import { DbDiaryEntry } from "~/lib/server/editor.js.server";

type EditStatus = "saved" | "saving" | "error";

type EditorHeaderProps = {
  inEditMode: true;
  diaryEntry: DbDiaryEntry;
  storedStatus: EditStatus;
} | {
  inEditMode: false;
  diaryEntry: DiaryEntry;
};
