"use client";

import { useEffect, useState } from "react";
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
import { add, format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { TimePickerDemo } from "~/lib/components/ui/time-picker-demo";
import {
  dbDiaryEntryGetWorkers,
  DiaryWorker,
  DiaryWorkTableEntryCollaboratorExtended,
} from "~/lib/server/editor.js.server";
import { useServerFn } from "@tanstack/react-start";

function WorkerToOption(worker: DiaryWorker): Option {
  console.log("WorkerToOption", worker);
  return {
    value: worker.id,
    label: worker.email,
  };
}

function OptionToWorker(option: Option): DiaryWorker {
  return {
    id: option.value,
    name: option.label,
    email: option.label,
  };
}

export default function DiaryWorkTableEntryEditor({
  workTableData: rows,
  setWorkTableData: setRows,
}: {
  workTableData: DiaryWorkTableEntryCollaboratorExtended[];
  setWorkTableData: (
    rowData: DiaryWorkTableEntryCollaboratorExtended[],
  ) => void;
}) {
  const dbDiaryEntryGetWorkersFn = useServerFn(dbDiaryEntryGetWorkers);
  const [workersOptions, setWorkersOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchData() {
      const workersData = await dbDiaryEntryGetWorkersFn();
      if (workersData.success && workersData.data) {
        const options = workersData.data.map((worker) => ({
          value: worker.id,
          label: `${worker.name ?? "Unknown"} (${worker.email})`,
        }));
        setWorkersOptions(options);
      }
    }
    fetchData();
  }, []);

  const time30mins = 30 * 60 * 1000;

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(), // Generate a unique numeric ID using timestamp
        workers: [],
        workedAt: null,
        workedSeconds: time30mins,
        description: "",
      },
    ]);
  };

  const deleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (
    index: number,
    key: keyof DiaryWorkTableEntryCollaboratorExtended,
    value: Option[] | Date | string | number | undefined,
  ) => {
    const updatedRows = [...rows];
    if (key === "workers") {
      updatedRows[index][key] = (value as Option[]).map(OptionToWorker);
    } else if (key === "workedAt") {
      const dateValueNew = value as Date;
      const dateValueOld = updatedRows[index][key];

      function setDate(date: Date) {
        (updatedRows[index][key] as Date) = date;
      }

      if (!dateValueNew) return;
      if (!dateValueOld) {
        setDate(dateValueNew);
        return;
      }
      const diff = dateValueNew.getTime() - dateValueOld.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(dateValueOld, { days: Math.ceil(diffInDays) });
      setDate(newDateFull);

      updatedRows[index][key] = value as Date;
    } else if (key === "workedSeconds") {
      updatedRows[index][key] = value as number;
    } else if (key === "description") {
      updatedRows[index][key] = value as string;
    }

    console.log(updatedRows);

    setRows(updatedRows);
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
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex flex-col items-center gap-2">
                <MultipleSelector
                  value={row.workers.map(WorkerToOption)}
                  onChange={(value) => updateRow(index, "workers", value)}
                  options={workersOptions}
                  placeholder="Select workers"
                  hideClearAllButton
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
                        ? (
                          format(row.workedAt, "PPP (HH:mm)")
                        )
                        : <span>Pick a date and time</span>}
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
                      <TimePickerDemo
                        setDate={(date: Date | undefined) =>
                          updateRow(index, "workedAt", date)}
                        date={row.workedAt ?? undefined}
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
              />
            </TableCell>
            <TableCell className="w-min">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteRow(index)}
                className="text-red-500"
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={5}>
            <Button variant="ghost" onClick={addRow} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" /> Add Row
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
