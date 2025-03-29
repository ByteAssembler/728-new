import { createFileRoute, Link } from "@tanstack/react-router";

import { PlusIcon } from "lucide-react";
import {
  DiaryEntry,
  DiaryEntryContent,
  DiaryEntryItem,
  DiaryEntryTrigger,
} from "~/lib/components/ui/diary-entries";
import { Button } from "~/lib/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { dbCreateDiaryEntry, dbReadDiaryEntries } from "~/lib/server/editor.js.server";
import { DeleteDiary, EditDiary } from '~/lib/components/wrapper/diary/diary-edit-dialog';
import ClientOnly from "~/lib/components/ClientOnlyComponent";

export const Route = createFileRoute("/(public)/diary")({
  component: DiaryList,
  loader: async (ctx) => {
    const diaryEntries = await dbReadDiaryEntries();
    return { user: ctx.context.user, diaryEntries };
  },
});

export type ReadDiaryEntriesResult = Awaited<ReturnType<typeof dbReadDiaryEntries>>;
type ReadDiaryEntriesResultData = NonNullable<ReadDiaryEntriesResult>["data"];
type DiaryEntryArrayType = NonNullable<ReadDiaryEntriesResultData>["entries"];
type DiaryEntryType = DiaryEntryArrayType[number];

function DiaryList() {
  const { user, diaryEntries } = Route.useLoaderData();
  const createDiary = useServerFn(dbCreateDiaryEntry);

  return (
    <main className="w-full">
      <div className=" py-8 p-12 flex justify-between items-center gap-4">
        <div className="space-y-2">
          <h1 className="scroll-m-20 font-bold text-3xl text-balance tracking-tight">
            Our Diary
          </h1>
        </div>
        {user && (
          <ClientOnly>
            <Button
              className="z-40"
              onClick={() => createDiary()}
            >
              <PlusIcon size={24} />
              <span className="hidden md:inline-block">New Entry</span>
            </Button>
          </ClientOnly>
        )}
      </div>
      <div className="space-y-4 pt-8 pb-12 ">
        <DiaryEntry
          type="single"
          collapsible
          className="w-full pr-[2vw] md:pr-[4vw] "
        >
          {diaryEntries.success && diaryEntries.data && diaryEntries.data.entries.map((entry) => (
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
  const day = dayDate.getDay();
  const month = dayDate.getMonth() + 1;
  //const triangleRef = useRef <SVGSVGElement>();

  /* const handleClick = (event: MouseEvent) => {
    if (triangleRef.current) {
      const svgElement = triangleRef.current;
      const point = svgElement.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const ctm = svgElement.getScreenCTM();
      if (ctm) {
        const transformedPoint = point.matrixTransform(ctm.inverse());
        const path = svgElement.querySelector("path");
        if (path && path instanceof SVGGeometryElement) {
          const isInPath = path.isPointInFill(transformedPoint);
          if (!isInPath) {
            setIsOpen(false);
            disableScroll();
          }
        }
      }
    }
  };*/

  const rand = Math.floor(Math.random() * 10) % 4;

  return (
    <DiaryEntryItem key={diaryEntry.id} value={diaryEntry.id}>
      <div className="relative">
        {rand === 0 && (
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
        )}
        {rand === 1 && (
          <svg
            className="absolute top-0 left-0 w-full h-auto"
            width="1433"
            height="183"
            viewBox="0 0 1433 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-14.5212 23.4957L1433 0L1387.12 183L-55 67.1836L-14.5212 23.4957Z"
              fill="#23CF51"
            />
          </svg>
        )}
        {rand === 2 && (
          <svg
            className="absolute top-0 left-0 w-full h-auto"
            width="1433"
            height="186"
            viewBox="0 0 1433 186"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-30 35.3643L1384.5 0.5L1433 186L-30 65.6882V35.3643Z"
              fill="#23CF51"
            />
          </svg>
        )}
        {rand === 3 && (
          <svg
            className="absolute top-0 left-0 w-full h-auto"
            width="1433"
            height="193"
            viewBox="0 0 1433 193"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-24 36.3373L1413.81 0L1433 193L-24 66.6698V36.3373Z"
              fill="#23CF51"
            />
          </svg>
        )}

        <DiaryEntryTrigger className="relative z-10 group ">
          <div className="font-Orbitron flex flex-row gap-8 md:gap-[11vw] font-extrabold items-center">
            <span className="flex z-10 gap-1 transform translate-x-2 md:translate-x-[4rem] -translate-y-[2.5rem] md:-translate-y-[2.2rem]">
              <svg
                className="w-16 h-auto md:w-[7.5vw]"
                viewBox="0 0 106 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 6.5L105.5 0L102.5 74L0 69.5V6.5Z" fill="white" />
                <text
                  x={day.toString().includes("1") ? "36" : "29"}
                  y="40"
                  fontSize="60"
                  className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                >
                  {day < 10 ? "0" + day : day}
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
                  x={month.toString().includes("1") ? "37" : "30"}
                  y="40"
                  fontSize="60"
                  className="font-extrabold fill-[#191919] text-center align-middle -translate-x-1/4 translate-y-1/4"
                >
                  {month < 10 ? "0" + month : month}
                </text>
              </svg>
            </span>

            <div
              className="text-left translate-x-1  md:-translate-x-[1vw] -translate-y-[1.5vw] md:translate-y-[0vw] leading-[3rem] md:leading-[4rem] truncate max-w-[55vw] md:max-w-[60vw] px-4"
              style={{
                fontSize: diaryEntry.title.length > 23 ? "3vw" : "4vw",
              }}
            >
              {diaryEntry.title}
            </div>
          </div>
        </DiaryEntryTrigger>
      </div>
      <DiaryEntryContent>
        <div className="space-y-2 py-8 p-12 -translate-y-3 font-Electrolize text-[24px]">
          <div className="flex gap-2">
            <div className="flex-grow">
              {/* <EditorBlockRenderer data={diaryEntry.data.content} /> */}
            </div>
            {isSignedIn && (
              <div className="flex flex-col gap-2 py-2">
                <ClientOnly>
                  <EditDiary diaryEntry={diaryEntry} />
                  <DeleteDiary diaryId={diaryEntry.id} diaryTitle={diaryEntry.title} />
                </ClientOnly>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <Link
              className="text-blue-500 hover:underline"
              to="/diary/$id"
              params={{ id: diaryEntry.id }}
            >
              Read more
            </Link>
          </div>
        </div>
      </DiaryEntryContent>
    </DiaryEntryItem>
  );
}
