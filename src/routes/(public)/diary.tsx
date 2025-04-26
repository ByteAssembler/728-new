import { createFileRoute, Link } from "@tanstack/react-router";

import { useServerFn } from "@tanstack/react-start";
import { PlusIcon } from "lucide-react";
import ClientOnly from "~/lib/components/ClientOnlyComponent";
import { Button } from "~/lib/components/ui/button";

import { useMediaQuery } from "@uidotdev/usehooks";
import {
  DiaryEntry,
  DiaryEntryContent,
  DiaryEntryItem,
  DiaryEntryTrigger,
} from "~/lib/components/ui/diary-entries";
import { DeleteDiary, EditDiary } from "~/lib/components/wrapper/diary/diary-edit-dialog";
import { dbCreateDiaryEntry, dbReadDiaryEntries } from "~/lib/server/editor.js.server";

export const Route = createFileRoute("/(public)/diary")({
  component: DiaryList,
  loader: async (ctx) => {
    const diaryEntries = await dbReadDiaryEntries();
    return { user: ctx.context.user, diaryEntries };
  },
  ssr: false,
});

export type ReadDiaryEntriesResult = Awaited<ReturnType<typeof dbReadDiaryEntries>>;
type ReadDiaryEntriesResultData = NonNullable<ReadDiaryEntriesResult>["data"];
type DiaryEntryArrayType = NonNullable<ReadDiaryEntriesResultData>["entries"];
export type DiaryEntryType = DiaryEntryArrayType[number];

function DiaryList() {
  const { user, diaryEntries } = Route.useLoaderData();
  const createDiary = useServerFn(dbCreateDiaryEntry);

  return (
    <main className="w-full min-h-screen">
      <div className=" py-8 p-12 flex justify-between items-center gap-4">
        <div className="space-y-2">
          <h1 className="scroll-m-20 mt-10 md:mt-0 font-bold text-3xl text-balance tracking-tight">
            Unser Tagebuch
          </h1>
        </div>
        {user && (
          <ClientOnly>
            <Button className="z-40" onClick={() => createDiary()}>
              <PlusIcon size={24} />
              <span className="hidden md:inline-block">New Entry</span>
            </Button>
          </ClientOnly>
        )}
      </div>
      <div className="space-y-4 pt-8 pb-12 max-w-[130rem]">
        <DiaryEntry type="single" collapsible className="w-full pr-[1rem] md:pr-[4vw] ">
          {diaryEntries.success &&
            diaryEntries.data &&
            diaryEntries.data.entries.map((entry) => (
              <FinalDiaryEntry
                key={entry.id}
                diaryEntry={entry}
                publicOnly={diaryEntries.data.publicOnly}
                isSignedIn={!!user}
              />
            ))}
        </DiaryEntry>
      </div>
    </main>
  );
}

function FinalDiaryEntry({
  diaryEntry,
  isSignedIn,
}: {
  diaryEntry: DiaryEntryType;
  publicOnly: boolean;
  isSignedIn: boolean;
}) {
  console.log(12345678, diaryEntry);

  const dayDate = new Date(diaryEntry.day);
  const day = dayDate.getDate();
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
  let fontSize = 80;
  if (diaryEntry.title.length > 3) {
    fontSize = 80 - (diaryEntry.title.length - 3) * 1;
  }

  const selectedSvg = largeSvgs[rand];

  return (
    <DiaryEntryItem key={diaryEntry.id} value={diaryEntry.id}>
      <div className="relative">
        <DiaryEntryTrigger className="relative group diary-entry">
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
                fontSize={fontSize}
                className="fill-white font-bold w-[10%] truncate"
              >
                {diaryEntry.title}
              </text>
              <g
                filter="url(#accordionhadow)"
                className="diary-entry-arrow text-muted-foreground transition-all duration-200 shrink-0 translate-x-[90%] translate-y-[35%]  h-auto w-[16rem] group-hover:translate-y-[25%] scale-140 md:scale-130"
                style={{ transformOrigin: "41px 21.5px" }}
              >
                <path
                  d="M78 43L40.6408 23.1226L4 43V23.1226L40.6408 0L78 23.1226V43Z"
                  fill="#191919"
                />
              </g>
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
                id="accordionhadow"
                x="0"
                y="0"
                width="82"
                height="51"
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
                  result="effect1_dropShadow_115_9"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_115_9"
                  result="shape"
                />
              </filter>
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
        </DiaryEntryTrigger>
      </div>
      <DiaryEntryContent>
        <div className="space-y-2 py-8 p-6 xs:p-12 -translate-y-3 font-Electrolize text-[18px] xs:text-[24px] md:text-[28px]">
          <div className="flex">
            <div className="flex-grow">
              {diaryEntry.contentHtml && (
                <div className="gap-4 -translate-y-3">
                  <p dangerouslySetInnerHTML={{ __html: diaryEntry.contentHtml }}></p>
                  <Link
                    className="text-[#23CF51] hover:underline"
                    to="/diary/$id"
                    params={{ id: diaryEntry.id }}
                  >
                    Erfahre mehr
                  </Link>
                </div>
              )}
            </div>
            {isSignedIn && (
              <div className="ml-2 flex flex-col gap-2 py-2">
                <ClientOnly>
                  <EditDiary diaryEntry={diaryEntry} />
                  <DeleteDiary diaryId={diaryEntry.id} diaryTitle={diaryEntry.title} />
                </ClientOnly>
              </div>
            )}
          </div>
        </div>
      </DiaryEntryContent>
    </DiaryEntryItem>
  );
}
