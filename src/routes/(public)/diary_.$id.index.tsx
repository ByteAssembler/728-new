import { createFileRoute } from "@tanstack/react-router";
import { dbReadDiaryEntry } from "~/lib/server/editor.js.server";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/lib/components/ui/table";
import { Avatar, AvatarFallback } from "~/lib/components/ui/avatar";

export const Route = createFileRoute('/(public)/diary_/$id/')({
  component: DiaryEntry,
  loader: async (ctx) => {
    const diaryEntry = await dbReadDiaryEntry({
      data: {
        diaryEntryId: ctx.params.id,
      }
    });

    let html;
    if (diaryEntry.success === true) {
      // const editor = ServerBlockNoteEditor.create();
      // const jsonBlockContent = JSON.parse(diaryEntry.data?.contentJson || "{}");
      // html = await editor.blocksToFullHTML(jsonBlockContent);
      html = diaryEntry.data?.contentHtml || "";
    }

    return { user: ctx.context.user, diaryEntry, html };
  },
  ssr: false,
});

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("");
}

function secondsInHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

function DiaryEntry() {
  const { diaryEntry, html } = Route.useLoaderData();

  if (!diaryEntry.success || !diaryEntry.data) {
    return <div>Diary entry not found</div>;
  }

  const date = new Date(diaryEntry.data?.day);

  return (
    <main className="mx-auto py-8">
      <div className="space-y-4 pt-8 pb-12">
        <div className="space-y-2 mb-8 w-full pr-[2vw] md:pr-[4vw]">
          <div className="relative ">
            <svg
              className="absolute top-0 left-0 w-full h-auto"
              width="1433"
              height="171"
              viewBox="0 0 1433 171"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-18 23.4315L1433 0L1383.09 171L-18 66.5V23.4315Z"
                fill="#23CF51"
              />
            </svg>
            <div className="font-Orbitron flex flex-row gap-8 md:gap-[11vw] font-extrabold items-center">
              <span className="flex z-10 gap-1 transform translate-x-2 md:translate-x-[4rem] -translate-y-[2rem] md:-translate-y-[2.2rem]">
                <svg
                  className="w-16 h-auto md:w-[7.5vw]"
                  viewBox="0 0 106 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 6.5L105.5 0L102.5 74L0 69.5V6.5Z" fill="white" />
                  <text
                    x={date.getDay().toString().includes("1") ? "36" : "29"}
                    y="40"
                    fontSize="60"
                    className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                  >
                    {date.getDay() < 10 ? "0" + date.getDay() : date.getDay()}
                  </text>
                </svg>

                <svg
                  className="w-16 h-auto md:w-[7.5vw]"
                  viewBox="0 0 104 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.12406 0L103 12.478V78L0.5 69.5L8.12406 0Z"
                    fill="white"
                  />
                  <text
                    x={date.getMonth().toString().includes("1") ? "37" : "30"}
                    y="40"
                    fontSize="60"
                    className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                  >
                    {date.getMonth() < 10
                      ? "0" + date.getMonth()
                      : date.getMonth()}
                  </text>
                </svg>
              </span>

              <div
                className="text-left translate-x-1  md:-translate-x-[1vw] -translate-y-[1.5vw] md:translate-y-[0vw] leading-[3rem] md:leading-[4rem] truncate max-w-[55vw] md:max-w-[60vw] px-4"
                style={{
                  fontSize: diaryEntry.data.title.length > 23 ? "3vw" : "4vw",
                }}
              >
                <h1>{diaryEntry.data.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html || "" }}
          />
        </div>
        <Table className="mt-20">
          <TableCaption>
            Work table entries for {diaryEntry.data.day.toLocaleDateString()}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Workers</TableHead>
              <TableHead>Work day and time</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diaryEntry.data.workTableEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-2">
                    {entry.workers.map((worker) => (
                      <div key={worker.id} className="flex items-center gap-2">
                        {worker.name && (
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(worker.name)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <span>{worker.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {`Worked at ${new Date(
                    entry.workedAt || diaryEntry.data.day,
                  ).toLocaleDateString()
                    } for ${secondsInHoursAndMinutes(
                      entry.workedSeconds,
                    )
                    }`}
                </TableCell>
                <TableCell>{entry.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
