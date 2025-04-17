"use client";

import {
  DiaryEditDialog,
  DiaryEditDialogContent,
  DiaryEditDialogFooter,
  DiaryEditDialogHeader,
  DiaryEditDialogTitle,
  DiaryEditDialogTrigger,
} from "~/lib/components/ui/diary-edit-dialog";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/lib/components/ui/tabs";
import { Button } from "~/lib/components/ui/button";
import {
  CalendarIcon,
  CloudAlertIcon,
  Loader2Icon,
  LoaderCircleIcon,
  PencilIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/lib/components/ui/alert-dialog";
import { Label } from "~/lib/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/lib/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { Calendar } from "~/lib/components/ui/calendar";
import { Switch } from "~/lib/components/ui/switch";
import DiaryWorkTableEntryEditor from "./diary-work-table-editor";
import {
  dbDeleteDiaryEntry,
  dbSaveDiaryEntryContent,
  dbSaveDiaryEntryMetadata,
  dbSaveDiaryEntryTableData,
  DiaryWorkTableEntryCollaboratorExtended,
} from "~/lib/server/editor.js.server";
import { EditStatus } from "default";
import { EditorComponent } from "./diary-editor";
import { useServerFn } from "@tanstack/react-start";
import type { DiaryEntryType } from "~/routes/(public)/diary";

type OutputData = string;

export function EditDiary({ diaryEntry }: { diaryEntry: DiaryEntryType }) {
  const [editStatusContent, setEditStatusContent] = useState<EditStatus>(
    "saved",
  );
  const [editStatusMetadata, setEditStatusMetadata] = useState<EditStatus>(
    "saved",
  );
  const [editStatusWorkTable, setEditStatusWorkTable] = useState<EditStatus>(
    "saved",
  );

  const dbSaveDiaryEntryContentFn = useServerFn(dbSaveDiaryEntryContent);
  const dbSaveDiaryEntryMetadataFn = useServerFn(dbSaveDiaryEntryMetadata);
  const dbSaveDiaryEntryTableDataFn = useServerFn(dbSaveDiaryEntryTableData);

  const [content, setContent] = useState<OutputData>(diaryEntry.contentJson);
  const [dayDate, setDayDate] = useState<Date>(diaryEntry.day);
  const [published, setPublished] = useState<boolean>(diaryEntry.published);

  const [title, setTitle] = useState(diaryEntry.title);
  const debouncedTitle = useDebounce(title, 500);

  const [workTableData, setWorkTableData] = useState<
    DiaryWorkTableEntryCollaboratorExtended[]
  >(diaryEntry.workTableEntries);
  const debouncedWorkTableData = useDebounce(workTableData, 500);

  async function saveContent(dataJsonString: string, dataHtmlString: string) {
    if (dataJsonString === content) {
      console.log("no changes");
      return;
    }

    setEditStatusContent("saving");

    const result = await dbSaveDiaryEntryContentFn({
      data: {
        diaryEntryId: diaryEntry.id,
        dataJson: dataJsonString,
        dataHtml: dataHtmlString,
      }
    });

    // setContent(result.data?.diaryEntry?.content);
    setContent(dataJsonString);

    if (result.success) { // data.time === result.lastEditedTimestamp
      setEditStatusContent("saved");
    } else {
      setEditStatusContent("error");
    }
  }

  async function saveMetadata(
    title: string,
    dayDate: Date,
    published: boolean,
  ) {
    setEditStatusMetadata("saving");

    const result = await dbSaveDiaryEntryMetadataFn(
      {
        data: {
          diaryEntryId: diaryEntry.id,
          newTitle: title,
          dayDate,
          published,
        }
      }
    );

    if (result) {
      setEditStatusMetadata("saved");
    } else {
      setEditStatusMetadata("error");
    }
  }

  async function saveWorkTable(
    workTableData: DiaryWorkTableEntryCollaboratorExtended[],
  ) {
    setEditStatusWorkTable("saving");

    await dbSaveDiaryEntryTableDataFn({
      data: {
        diaryEntryId: diaryEntry.id,
        workTableData,
      }
    });

    setEditStatusWorkTable("saved");
  }

  useEffect(() => {
    console.log("useEffect", debouncedTitle, diaryEntry.title);
    if (
      debouncedTitle !== diaryEntry.title ||
      dayDate !== diaryEntry.day ||
      published !== diaryEntry.published
    ) {
      saveMetadata(debouncedTitle, dayDate, published);
    }
  }, [debouncedTitle, dayDate, published]);

  useEffect(() => {
    saveWorkTable(debouncedWorkTableData);
  }, [debouncedWorkTableData]);

  function getFinalStatus(...statuses: EditStatus[]): EditStatus {
    if (statuses.includes("error")) return "error";
    if (statuses.includes("saving")) return "saving";
    return "saved";
  }

  return (
    <DiaryEditDialog>
      <DiaryEditDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon size={24} />
        </Button>
      </DiaryEditDialogTrigger>
      <DiaryEditDialogContent>
        <DiaryEditDialogHeader>
          <DiaryEditDialogTitle
            className="w-full h-min"
            onValueOnlyInput={(rawTitle) => setTitle(rawTitle.trim())}
          >
            {title}
          </DiaryEditDialogTitle>
        </DiaryEditDialogHeader>
        <div className="gap-4 h-[55vh] py-2">
          <Tabs defaultValue="content" className="h-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-1/3" value="content">
                Content
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="settings">
                Settings
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="work-table">
                Work Table
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="pt-2 h-[calc(55vh-2.25rem-1.5rem)] w-[calc(42rem-1.5rem*2)] overflow-auto"
              value="content"
            >
              <EditorComponent
                defaultData={content}
                onDataChange={saveContent}
              />
            </TabsContent>

            <TabsContent
              value="settings"
              className="pt-2 h-[calc(55vh-2.25rem-1.5rem)] w-[calc(42rem-1.5rem*2)] overflow-auto"
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="day-date" className="text-right">
                    Date in diary (order)
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !dayDate && "text-muted-foreground",
                        )}
                        id="day-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dayDate
                          ? (
                            format(dayDate, "PPP")
                          )
                          : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dayDate}
                        onSelect={(day) => day && setDayDate(day)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="public" className="text-right">
                    Public
                  </Label>
                  <Switch
                    id="public"
                    checked={published}
                    onCheckedChange={(checked) => setPublished(checked)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="work-table"
              className="pt-2 h-[calc(55vh-2.25rem-1.5rem)] w-[calc(42rem-1.5rem*2)] overflow-auto"
            >
              <DiaryWorkTableEntryEditor
                workTableData={workTableData}
                setWorkTableData={setWorkTableData}
              />
            </TabsContent>
          </Tabs>
        </div>
        <DiaryEditDialogFooter>
          <div className="mt-auto mr-auto">
            <StatusIndicator
              status={getFinalStatus(
                editStatusMetadata,
                editStatusContent,
                editStatusWorkTable,
              )}
            />
          </div>
          {/* <Button type="submit">Save changes</Button> */}
        </DiaryEditDialogFooter>
      </DiaryEditDialogContent>
    </DiaryEditDialog>
  );
}

function StatusIndicator({ status }: { status: EditStatus }) {
  switch (status) {
    case "saved":
      return (
        <div className="flex items-center gap-1 text-green-500">
          <SaveIcon size={18} />
          <span className="text-sm">Saved</span>
        </div>
      );
    case "saving":
      return (
        <div className="flex items-center gap-1 text-blue-500">
          <LoaderCircleIcon className="animate-spin" size={18} />
          <span className="text-sm">Saving...</span>
        </div>
      );
    case "error":
      return (
        <div className="flex items-center gap-1 text-red-500">
          <CloudAlertIcon size={18} />
          <span className="text-sm">Failed to save</span>
        </div>
      );
  }
}

export function DeleteDiary({ diaryTitle, diaryId }: { diaryTitle: string, diaryId: string }) {
  const dbDeleteDiaryEntryFn = useServerFn(dbDeleteDiaryEntry);
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {diaryTitle}?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this diary entry? This action cannot
          be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogTrigger>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await dbDeleteDiaryEntryFn({
                data: {
                  diaryEntryId: diaryId,
                }
              });
              // setLoading(false);
            }}
          >
            {loading && <Loader2Icon className="animate-spin" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
