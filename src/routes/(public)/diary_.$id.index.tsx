"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Avatar, AvatarFallback } from "~/lib/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { dbReadDiaryEntry } from "~/lib/server/editor.js.server";

export const Route = createFileRoute("/(public)/diary_/$id/")({
  component: DiaryEntry,
  loader: async (ctx) => {
    const diaryEntry = await dbReadDiaryEntry({
      data: {
        diaryEntryId: ctx.params.id,
      },
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

  const dayDate = new Date(diaryEntry.data.day);
  const day = dayDate.getDay();
  const month = dayDate.getMonth() + 1;
  const isMobile = useMediaQuery("(max-width: 431px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const rand = Math.floor(Math.random() * 10) % 4;
  const largeSvgs = [
    { width: 1433, height: 171, d: "M-18 52.4315L1433 29L1383.09 200L-18 95.5V52.4315Z" },
    {
      width: 1433,
      height: 183,
      d: "M-14.5212 52.4957L1433 29L1387.12 212L-55 96.1836L-14.5212 52.4957Z",
    },
    {
      width: 1433,
      height: 186,
      d: "M-30 52.3643L1384.5 17.5L1433 203L-30 101.5V52.3643Z",
    },
    { width: 1433, height: 193, d: "M-18 52.4315L1433 29L1383.09 200L-18 95.5V52.4315Z" },
  ];

  const selectedSvg = largeSvgs[rand];

  return (
    <main className="mx-auto py-8 min-h-screen">
      <div className="space-y-4 pt-8 pb-12 max-w-4xl mx-auto">
        <div className="space-y-2 mb-8 w-full pr-[2vw] md:pr-[4vw]">
          <div className="relative ">
            <svg
              preserveAspectRatio="xMidYMin meet" // Maintain aspect ratio while scaling
              className="w-full scale-150 xs:scale-125 md:scale-100  -translate-x-[20%] xs:-translate-x-[10%] md:translate-x-0 h-auto" // Make SVG responsive
              viewBox={`0 ${isMobile ? "-38" : "0"} 1444 ${isMobile ? "250" : "218"}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#mainShadow)">
                <path d={selectedSvg.d} fill="#23CF51" />
                <text
                  x={isMobile ? "35%" : isTablet ? "45%" : "36%"}
                  y={isMobile ? "50%" : "54%"}
                  fontSize={isMobile ? "80px" : isTablet ? "70px" : "80px"}
                  className="fill-white font-bold w-[10%] truncate"
                >
                  {diaryEntry.data.title}
                </text>
              </g>
              <g className="md:translate-x-0 xs:translate-x-[15%] translate-x-[28%] -translate-y-[18%] xs:translate-y-0 md:translate-y-0">
                <g
                  filter="url(#dayShadow)"
                  className="-translate-x-[5rem] md:translate-0 scale-125 xs:scale-115 md:scale-none"
                >
                  <path d="M143 11.5L248.5 5L245.5 79L143 74.5V11.5Z" fill="white" />
                  <text
                    x={day.toString().includes("1") ? "36%" : "35%"}
                    y={isMobile ? "0%" : "5%"}
                    fontSize="60"
                    className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                  >
                    {day < 10 ? "0" + day : day}
                  </text>
                </g>

                <g
                  filter="url(#monthShadow)"
                  className="-translate-x-[5rem] md:translate-0 scale-125 xs:scale-115 md:scale-none"
                >
                  <path d="M264.124 6L359 18.478V84L256.5 75.5L264.124 6Z" fill="white" />
                  <text
                    x={month.toString().includes("1") ? "44%" : "43.2%"}
                    y={isMobile ? "0%" : "6%"}
                    fontSize="60"
                    className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                  >
                    {month < 10 ? "0" + month : month}
                  </text>
                </g>
              </g>
              <defs>
                <filter
                  id="mainShadow"
                  x="-24.8"
                  y="5"
                  width="1468.6"
                  height="212.8"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="9" />
                  <feGaussianBlur stdDeviation="4.4" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_115_6"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_115_6"
                    result="shape"
                  />
                </filter>
                <filter
                  id="dayShadow"
                  x="143"
                  y="5"
                  width="113.5"
                  height="82"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_115_6"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_115_6"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_115_6"
                  x="252.5"
                  y="6"
                  width="111.907"
                  height="86"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_115_6"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_115_6"
                    result="shape"
                  />
                </filter>
                <filter
                  id="monthShadow"
                  x="256.5"
                  y="6"
                  width="110.5"
                  height="86"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="4" dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_115_6"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_115_6"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="px-4 min-h-[calc(100vh-160px-160px-160px-100px)]">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html || "" }}
          />
        </div>
        <div className="px-4">
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
                              <AvatarFallback>{getInitials(worker.name)}</AvatarFallback>
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
                    ).toLocaleDateString()} for ${secondsInHoursAndMinutes(
                      entry.workedSeconds,
                    )}`}
                  </TableCell>
                  <TableCell>{entry.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
