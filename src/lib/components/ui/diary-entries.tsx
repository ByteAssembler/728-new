"use client";

import * as React from "react";
import * as DiaryEntryPrimitive from "@radix-ui/react-accordion";

import { cn } from "~/lib/utils";

const DiaryEntry = DiaryEntryPrimitive.Root;

const DiaryEntryItem = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Item> & { ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Item> | null> }) => (
  <DiaryEntryPrimitive.Item
    ref={ref}
    className={cn("pb-[5vw]", "md:pb-[9vw]", className)}
    {...props}
  />
);
DiaryEntryItem.displayName = "DiaryEntryItem";

const DiaryEntryTrigger = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Trigger> & { ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Trigger> | null> }) => (
  <DiaryEntryPrimitive.Header className="flex">
    <DiaryEntryPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all  text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        className=" text-muted-foreground transition-transform duration-200 shrink-0 -translate-x-[2rem] md:-translate-x-[4vw] translate-y-1 md:translate-y-[1.3vw] w-16 h-auto md:w-[7vw] group-hover:-translate-y-[0.3rem]
        md:group-hover:-translate-y-[1px]"
        viewBox="0 0 82 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#shadow)">
          <path
            d="M78 43L40.6408 23.1226L4 43V23.1226L40.6408 0L78 23.1226V43Z"
            fill="#191919"
          />
        </g>
        <defs>
          <filter
            id="shadow"
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
        </defs>
      </svg>
    </DiaryEntryPrimitive.Trigger>
  </DiaryEntryPrimitive.Header>
);
DiaryEntryTrigger.displayName = DiaryEntryPrimitive.Trigger.displayName;

const DiaryEntryContent = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Content> & { ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Content> | null> }) => (
  <DiaryEntryPrimitive.Content
    ref={ref}
    className="text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden "
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </DiaryEntryPrimitive.Content>
);
DiaryEntryContent.displayName = DiaryEntryPrimitive.Content.displayName;

export { DiaryEntry, DiaryEntryContent, DiaryEntryItem, DiaryEntryTrigger };
