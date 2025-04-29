"use client";

import { useEffect, useState, useRef } from "react";
import MultipleSelector, { Option } from "~/lib/components/ui/multiselect";
import { Button } from "~/lib/components/ui/button";
import { Calendar } from "~/lib/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/lib/components/ui/popover";
import { Textarea } from "~/lib/components/ui/textarea";
import { CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { WorkTimeInput } from "~/lib/components/ui/time-picker-demo";
import {
  dbDiaryEntryGetWorkers,
  DiaryWorkTableEntryCollaboratorExtended,
} from "~/lib/server/editor.js.server";
import { useServerFn } from "@tanstack/react-start";

function WorkerToOption(worker: { id: string; name: string | null; email: string | null; }): Option {
  return {
    value: worker.id,
    label: worker.name ?? worker.email ?? worker.id,
  };
}

function OptionToWorker(option: Option): { id: string; name: string | null; email: string; } {
  return {
    id: option.value,
    name: option.label,
    email: option.label,
  };
}

export default function DiaryWorkTableEntryEditor({
  workTableData: initialRows,
  setWorkTableData: setParentRows,
}: {
  workTableData: DiaryWorkTableEntryCollaboratorExtended[];
  setWorkTableData: (
    rowData: DiaryWorkTableEntryCollaboratorExtended[],
  ) => void;
}) {
  const dbDiaryEntryGetWorkersFn = useServerFn(dbDiaryEntryGetWorkers);
  const [workersOptions, setWorkersOptions] = useState<Option[]>([]);

  const [internalRows, setInternalRows] = useState<DiaryWorkTableEntryCollaboratorExtended[]>(initialRows);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 750;

  useEffect(() => {
    if (JSON.stringify(initialRows) !== JSON.stringify(internalRows)) {
      console.log("External data changed, updating internal state.");
      setInternalRows(initialRows);
    }
  }, [initialRows, internalRows]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      console.log("Debounce timer fired. Calling setParentRows.");
      setParentRows(internalRows);
    }, debounceDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [internalRows, setParentRows, debounceDelay]);

  useEffect(() => {
    async function fetchData() {
      try {
        const workersData = await dbDiaryEntryGetWorkersFn();
        if (workersData.success && workersData.data) {
          const options: Option[] = workersData.data.map(WorkerToOption);
          setWorkersOptions(options);
        } else if (!workersData.success) {
          console.error("Failed to fetch workers:", workersData.reason);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    }
    console.log("Fetching workers...");
    fetchData();
  }, []);

  const defaultWorkedSeconds = 30 * 60;

  const addRow = () => {
    const tempId = -Date.now();
    setInternalRows([
      ...internalRows,
      {
        id: tempId,
        workers: [],
        workedAt: new Date(),
        workedSeconds: defaultWorkedSeconds,
        description: "",
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setInternalRows(internalRows.filter((_, i) => i !== index));
  };

  const updateRow = (
    index: number,
    key: keyof DiaryWorkTableEntryCollaboratorExtended,
    value: Option[] | Date | string | number | undefined | null,
  ) => {
    const updatedRows = [...internalRows];
    const currentRow = updatedRows[index];

    if (!currentRow) return;

    let changed = false;

    switch (key) {
      case "workers": {
        const newSelectedOptions = value as Option[];
        const newWorkers = newSelectedOptions.map(OptionToWorker);
        const currentWorkerIds = new Set(currentRow.workers.map(w => w.id));
        const newWorkerIds = new Set(newWorkers.map(w => w.id));

        if (currentWorkerIds.size !== newWorkerIds.size || ![...currentWorkerIds].every(id => newWorkerIds.has(id))) {
          // The type assertion is no longer needed as OptionToWorker now returns the correct type
          currentRow.workers = newWorkers;
          changed = true;
          console.log("Worker selection changed.");
        }
        break;
      }
      case "workedAt": {
        const dateValueNew = value as Date | null | undefined;
        const dateValueOld = currentRow.workedAt;
        let finalDate: Date | null = currentRow.workedAt;

        if (dateValueNew === undefined || dateValueNew === null) {
          finalDate = null;
        } else if (!dateValueOld) {
          finalDate = dateValueNew;
        } else {
          const newDateFull = new Date(dateValueOld);
          newDateFull.setFullYear(dateValueNew.getFullYear());
          newDateFull.setMonth(dateValueNew.getMonth());
          newDateFull.setDate(dateValueNew.getDate());
          finalDate = newDateFull;
        }

        if (finalDate?.getTime() !== dateValueOld?.getTime()) {
          currentRow.workedAt = finalDate;
          changed = true;
        }
        break;
      }
      case "workedSeconds": {
        const seconds = typeof value === 'number' && !isNaN(value) && value >= 0 ? value : 0;
        if (currentRow.workedSeconds !== seconds) {
          currentRow.workedSeconds = seconds;
          changed = true;
        }
        break;
      }
      case "description": {
        const newDescription = typeof value === 'string' ? value : "";
        if (currentRow.description !== newDescription) {
          currentRow.description = newDescription;
          changed = true;
        }
        break;
      }
      default:
        console.warn(`Unhandled key in updateRow: ${key}`);
        break;
    }

    if (changed) {
      console.log("Internal state updated for row:", index, "key:", key);
      setInternalRows(updatedRows);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Workers + WorkTime</TableHead>
          <TableHead className="w-2/5">Description</TableHead>
          <TableHead className="w-min">Del.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {internalRows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>
              <div className="flex flex-col items-start gap-2">
                <MultipleSelector
                  value={row.workers.map(WorkerToOption)}
                  onChange={(value) => updateRow(index, "workers", value)}
                  options={workersOptions}
                  placeholder="Select workers"
                  hideClearAllButton
                  className="w-full"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "min-w-[240px] w-full justify-start text-left font-normal",
                        !row.workedAt && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {row.workedAt
                        ? format(row.workedAt, "PPP")
                        : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={row.workedAt ?? undefined}
                      onSelect={(d) => updateRow(index, "workedAt", d)}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <WorkTimeInput
                        workedMinutes={row.workedSeconds / 60}
                        setWorkedMinutes={(newMinutes) => {
                          const newSeconds = (newMinutes === undefined || isNaN(newMinutes))
                            ? 0
                            : Math.round(newMinutes * 60);
                          updateRow(index, "workedSeconds", newSeconds);
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableCell>
            <TableCell>
              <Textarea
                value={row.description}
                onChange={(e) =>
                  updateRow(index, "description", e.target.value)}
                placeholder="Enter description"
                rows={3}
                className="min-h-[80px]"
              />
            </TableCell>
            <TableCell className="w-min align-top pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteRow(index)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3}>
            <Button variant="outline" onClick={addRow} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" /> Add Row
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
