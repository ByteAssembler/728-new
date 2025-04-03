"use client";

import * as DiaryEntryPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "~/lib/utils";

const DiaryEntry = DiaryEntryPrimitive.Root;

const DiaryEntryItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Item> & {
  ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Item> | null>;
}) => (
  <DiaryEntryPrimitive.Item
    ref={ref}
    className={cn("pb-[5vw]", "md:pb-[9vw]", className)}
    {...props}
  />
);
DiaryEntryItem.displayName = "DiaryEntryItem";

const DiaryEntryTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Trigger> & {
  ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Trigger> | null>;
}) => (
  <DiaryEntryPrimitive.Header className="flex">
    <DiaryEntryPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all  text-left [&[data-state=open]_.diary-entry-arrow]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
    </DiaryEntryPrimitive.Trigger>
  </DiaryEntryPrimitive.Header>
);
DiaryEntryTrigger.displayName = DiaryEntryPrimitive.Trigger.displayName;

const DiaryEntryContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DiaryEntryPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<typeof DiaryEntryPrimitive.Content> | null>;
}) => (
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
