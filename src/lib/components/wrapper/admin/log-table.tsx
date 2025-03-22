import { Badge } from "~/lib/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/lib/components/ui/hover-card";
import { CircleHelpIcon } from "lucide-react";

type LogLevel = "debug" | "info" | "warning" | "error";

interface LogEntry {
  id: string;
  kind: LogLevel;
  level: string;
  message: string;
  simpleMessage?: string;
  details: string;
  createdAt: string;
}

const logs: LogEntry[] = [
  {
    id: "1",
    kind: "info",
    level: "INFO",
    message: "This is an info message",
    details: "This is an info message",
    createdAt: "2021-10-01T12:00:00Z",
  },
  {
    id: "2",
    kind: "warning",
    level: "WARNING",
    message: "This is a warning message",
    details: "This is a warning message",
    createdAt: "2021-10-02T12:00:00Z",
  },
  {
    id: "3",
    kind: "error",
    level: "ERROR",
    message: "This is an error message",
    simpleMessage: "This is an error message",
    details: "This is an error message",
    createdAt: "2021-10-03T12:00:00Z",
  },
  {
    id: "4",
    kind: "info",
    level: "INFO",
    message: "This is an info message",
    details: "This is an info message",
    createdAt: "2021-10-04T12:00:00Z",
  },
  {
    id: "5",
    kind: "debug",
    level: "DEBUG",
    message: "This is a warning message",
    simpleMessage: "This is a warning message",
    details: "This is a warning message",
    createdAt: "2021-10-05T12:00:00Z",
  },
  {
    id: "6",
    kind: "error",
    level: "ERROR",
    message: "This is an error message",
    details: "This is an error message",
    createdAt: "2021-10-06T12:00:00Z",
  },
];

function LogLevelBadge({ level }: { level: LogLevel }) {
  const variants: Record<
    LogLevel,
    "secondary" | "warning" | "destructive" | "debug"
  > = {
    info: "secondary",
    warning: "warning",
    error: "destructive",
    debug: "debug",
  };

  return (
    <Badge className="rounded" variant={variants[level]}>
      {level.toUpperCase()}
    </Badge>
  );
}

export default function LogTable() {
  return (
    <Table>
      <TableHeader className="select-none">
        <TableRow>
          <TableHead className="w-[100px]">Log Level</TableHead>
          <TableHead>Kind</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="text-right w-[65px]">
            Details
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium select-none">
              <LogLevelBadge level={invoice.kind} />
            </TableCell>
            <TableCell>{invoice.kind}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                {invoice.simpleMessage || invoice.message}
                {invoice.simpleMessage && (
                  <DetailsTooltip
                    title={invoice.message}
                    content={invoice.details}
                  />
                )}
              </div>
            </TableCell>
            <TableCell className="flex justify-end items-center">
              <DetailsTooltip
                title={invoice.message}
                content={invoice.details}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DetailsTooltip(
  {
    title,
    content,
    createAt,
  }: {
    title: string;
    content: string;
    createAt?: string;
  },
) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="inline-block">
          <div className="flex items-center gap-1.5">
            <Badge
              className="p-0.5 rounded-full"
              variant="outline"
            >
              <CircleHelpIcon size={16} />
            </Badge>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-[300px] text-left">
        <div className="space-y-3">
          <div className="space-y-1">
            <h2 className="font-semibold">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm">
              {content}
            </p>
          </div>
          {createAt && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              {/* <span>8 min read</span><span>·</span> */}
              <span>Published {createAt}</span>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
