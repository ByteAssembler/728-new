"use client";

import * as React from "react";
import { Label } from "~/lib/components/ui/label";
import { Input } from "~/lib/components/ui/input";
import { MINUTES_PER_PROJECT_HOURS } from "~/lib/project";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/lib/components/ui/select";
import { cn } from "~/lib/utils";

type InputMode = "minutes" | "normal" | "project";

interface WorkTimeInputProps {
  workedMinutes: number | undefined;
  setWorkedMinutes: (workedMinutes: number | undefined) => void;
  className?: string;
}

export function WorkTimeInput({
  workedMinutes,
  setWorkedMinutes,
  className,
}: WorkTimeInputProps) {
  const [mode, setMode] = React.useState<InputMode>("normal");
  const [activeField, setActiveField] = React.useState<string | null>(null);

  const [displayHours, setDisplayHours] = React.useState<string>("");
  const [displayNormalMinutes, setDisplayNormalMinutes] = React.useState<string>("");
  const [displayTotalMinutes, setDisplayTotalMinutes] = React.useState<string>("");
  const [displayProjectHours, setDisplayProjectHours] = React.useState<string>("");

  React.useEffect(() => {
    console.log("Sync Effect: workedMinutes changed to", workedMinutes);
    if (workedMinutes === undefined || workedMinutes === null || isNaN(workedMinutes)) {
      if (!activeField || activeField === "normal-hours") setDisplayHours("");
      if (!activeField || activeField === "normal-minutes") setDisplayNormalMinutes("");
      if (!activeField || activeField === "total-minutes") setDisplayTotalMinutes("");
      if (!activeField || activeField === "project-hours") setDisplayProjectHours("");
      return;
    }

    // Calculate values for all modes
    const normalH = Math.floor(workedMinutes / 60);
    const normalM = workedMinutes % 60;
    const projectHours = workedMinutes / MINUTES_PER_PROJECT_HOURS;

    // Only update fields that aren't currently being edited
    if (!activeField || activeField !== "normal-hours") {
      setDisplayHours(String(normalH));
    }

    if (!activeField || activeField !== "normal-minutes") {
      setDisplayNormalMinutes(String(normalM).padStart(2, '0'));
    }

    if (!activeField || activeField !== "total-minutes") {
      setDisplayTotalMinutes(String(workedMinutes));
    }

    if (!activeField || activeField !== "project-hours") {
      setDisplayProjectHours(projectHours.toFixed(2));
    }

    console.log(`Sync Effect: Set displays based on ${workedMinutes} minutes (active field: ${activeField})`);

  }, [workedMinutes, activeField]);

  const handleNormalHoursChange = (value: string) => {
    setActiveField("normal-hours");
    setDisplayHours(value);
    const hours = parseInt(value, 10) || 0;
    const minutes = parseInt(displayNormalMinutes, 10) || 0;
    const currentMinutes = Math.min(59, Math.max(0, minutes));
    const newTotalMinutes = hours * 60 + currentMinutes;
    console.log(`Handler Normal Hours: Input=${value}, Calculated Total Minutes=${newTotalMinutes}`);
    setWorkedMinutes(newTotalMinutes);
  };

  const handleNormalMinutesChange = (value: string) => {
    setActiveField("normal-minutes");
    setDisplayNormalMinutes(value);
    const rawMinutes = parseInt(value, 10);
    const clampedMinutes = isNaN(rawMinutes) ? 0 : Math.min(59, Math.max(0, rawMinutes));
    const hours = parseInt(displayHours, 10) || 0;
    const newTotalMinutes = hours * 60 + clampedMinutes;
    console.log(`Handler Normal Minutes: Input=${value}, Clamped=${clampedMinutes}, Calculated Total Minutes=${newTotalMinutes}`);
    setWorkedMinutes(newTotalMinutes);
  };

  const formatNormalMinutesOnBlur = (value: string) => {
    const rawMinutes = parseInt(value, 10);
    const clampedMinutes = isNaN(rawMinutes) ? 0 : Math.min(59, Math.max(0, rawMinutes));
    setDisplayNormalMinutes(String(clampedMinutes).padStart(2, '0'));
    setActiveField(null);
  };

  const handleTotalMinutesChange = (value: string) => {
    setActiveField("total-minutes");
    setDisplayTotalMinutes(value);
    const totalMins = parseFloat(value);
    const newTotalMinutes = isNaN(totalMins) || totalMins < 0 ? undefined : totalMins;
    console.log(`Handler Total Minutes: Input=${value}, Calculated Total Minutes=${newTotalMinutes}`);
    setWorkedMinutes(newTotalMinutes);
  };

  const formatTotalMinutesOnBlur = (value: string) => {
    setActiveField(null);
    const totalMins = parseFloat(value);
    if (isNaN(totalMins) || totalMins < 0) {
      if (workedMinutes !== undefined && !isNaN(workedMinutes)) {
        setDisplayTotalMinutes(String(workedMinutes));
      } else {
        setDisplayTotalMinutes("");
      }
    } else {
      setDisplayTotalMinutes(String(totalMins));
    }
  };

  const handleProjectHoursChange = (value: string) => {
    setActiveField("project-hours");
    setDisplayProjectHours(value);
    const projHours = parseFloat(value);
    let newTotalMinutes: number | undefined = undefined;
    if (!isNaN(projHours) && projHours >= 0) {
      newTotalMinutes = Math.round(projHours * MINUTES_PER_PROJECT_HOURS);
    }
    console.log(`Handler Project Hours: Input=${value}, Calculated Total Minutes=${newTotalMinutes}`);
    setWorkedMinutes(newTotalMinutes);
  };

  const formatProjectHoursOnBlur = (value: string) => {
    setActiveField(null);
    const projHours = parseFloat(value);
    if (isNaN(projHours) && (value !== '' && value !== '.')) {
      if (workedMinutes !== undefined && !isNaN(workedMinutes)) {
        setDisplayProjectHours((workedMinutes / MINUTES_PER_PROJECT_HOURS).toFixed(2));
      } else {
        setDisplayProjectHours('');
      }
    }
  };

  return (
    <div className={cn("flex flex-wrap items-end gap-4", className)}>
      <div className="grid gap-1">
        <Label htmlFor="work-time-mode" className="text-xs">Input Mode</Label>
        <Select value={mode} onValueChange={(value: InputMode) => setMode(value)}>
          <SelectTrigger id="work-time-mode" className="w-[150px]">
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Hours/Minutes</SelectItem>
            <SelectItem value="minutes">Total Minutes</SelectItem>
            <SelectItem value="project">Project Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === "normal" && (
        <div className="flex items-end gap-2">
          <div className="grid gap-1 text-center">
            <Label htmlFor="normal-hours" className="text-xs">
              Hours
            </Label>
            <Input
              id="normal-hours"
              type="number"
              min="0"
              value={displayHours}
              onChange={(e) => handleNormalHoursChange(e.target.value)}
              onFocus={() => setActiveField("normal-hours")}
              onBlur={() => setActiveField(null)}
              className="w-[70px]"
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="normal-minutes" className="text-xs">
              Minutes
            </Label>
            <Input
              id="normal-minutes"
              type="number"
              min="0"
              max="59"
              step="1"
              value={displayNormalMinutes}
              onChange={(e) => handleNormalMinutesChange(e.target.value)}
              onFocus={() => setActiveField("normal-minutes")}
              onBlur={(e) => formatNormalMinutesOnBlur(e.target.value)}
              className="w-[70px]"
            />
          </div>
          <span className="pb-1 text-sm text-muted-foreground">(60 min/hr)</span>
        </div>
      )}

      {mode === "minutes" && (
        <div className="flex items-end gap-2">
          <div className="grid gap-1">
            <Label htmlFor="total-minutes" className="text-xs">
              Total Minutes
            </Label>
            <Input
              id="total-minutes"
              type="number"
              min="0"
              step="any"
              value={displayTotalMinutes}
              onChange={(e) => handleTotalMinutesChange(e.target.value)}
              onFocus={() => setActiveField("total-minutes")}
              onBlur={(e) => formatTotalMinutesOnBlur(e.target.value)}
              className="w-[120px]"
            />
          </div>
        </div>
      )}

      {mode === "project" && (
        <div className="flex items-end gap-2">
          <div className="grid gap-1">
            <Label htmlFor="project-hours" className="text-xs">
              Project Hours
            </Label>
            <Input
              id="project-hours"
              type="number"
              min="0"
              step="0.01"
              value={displayProjectHours}
              onChange={(e) => handleProjectHoursChange(e.target.value)}
              onFocus={() => setActiveField("project-hours")}
              onBlur={(e) => formatProjectHoursOnBlur(e.target.value)}
              className="w-[120px]"
            />
          </div>
          <span className="pb-1 text-sm text-muted-foreground">(50 min/hr)</span>
        </div>
      )}

      {mode !== "minutes" && workedMinutes !== undefined && !isNaN(workedMinutes) && (
        <div className="grid gap-1 pl-2 border-l border-border">
          <Label className="text-xs text-muted-foreground">Total Minutes</Label>
          <span className="font-medium pt-2">{Number(workedMinutes.toFixed(2))}</span>
        </div>
      )}
    </div>
  );
}
