interface NormalTime {
  hours: number;
  minutes: number;
}

export const MINUTES_PER_PROJECT_HOURS = 50;

export function projectHoursToNormalHours(workHours: number): NormalTime {
  if (workHours < 0) {
    throw new Error("Work hours cannot be negative.");
  }

  const totalMinutes = Math.round(workHours * MINUTES_PER_PROJECT_HOURS);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function normalHoursToProjectHours(hours: number, minutes: number): number {
  if (hours < 0 || minutes < 0) {
    throw new Error("Hours and minutes cannot be negative.");
  }
  while (minutes >= 60) {
    hours++;
    minutes -= 60;
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes / MINUTES_PER_PROJECT_HOURS;
}
