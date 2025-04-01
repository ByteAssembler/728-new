"use client";

import * as React from "react";
import * as DiaryEditDialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "~/lib/utils";

const DiaryEditDialog = DiaryEditDialogPrimitive.Root;

const DiaryEditDialogTrigger = DiaryEditDialogPrimitive.Trigger;

const DiaryEditDialogPortal = DiaryEditDialogPrimitive.Portal;

const DiaryEditDialogClose = DiaryEditDialogPrimitive.Close;

const DiaryEditDialogOverlay = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DiaryEditDialogPrimitive.Overlay> & { ref?: React.RefObject<React.ElementRef<typeof DiaryEditDialogPrimitive.Overlay> | null> }) => (
  <DiaryEditDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
);
DiaryEditDialogOverlay.displayName =
  DiaryEditDialogPrimitive.Overlay.displayName;

const DiaryEditDialogContent = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof DiaryEditDialogPrimitive.Content> & { ref?: React.RefObject<React.ElementRef<typeof DiaryEditDialogPrimitive.Content> | null> }) => (
  <DiaryEditDialogPortal>
    <DiaryEditDialogOverlay />
    <DiaryEditDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DiaryEditDialogPrimitive.Close className="top-4 right-4 absolute data-[state=open]:bg-accent opacity-70 hover:opacity-100 rounded-sm focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 data-[state=open]:text-muted-foreground transition-opacity disabled:pointer-events-none focus:outline-none">
        <X className="w-4 h-4" />
        <span className="sr-only">Close</span>
      </DiaryEditDialogPrimitive.Close>
    </DiaryEditDialogPrimitive.Content>
  </DiaryEditDialogPortal>
);
DiaryEditDialogContent.displayName =
  DiaryEditDialogPrimitive.Content.displayName;

const DiaryEditDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DiaryEditDialogHeader.displayName = "DiaryEditDialogHeader";

const DiaryEditDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DiaryEditDialogFooter.displayName = "DiaryEditDialogFooter";

const DiaryEditDialogTitle = ({ ref, className, onChange, onValueOnlyInput, defaultValue, children }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onValueOnlyInput?: (title: string) => void;
  } & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => (
  <>
    <textarea
      ref={ref}
      className={cn(
        "text-lg font-semibold bg-transparent resize-none outline-none",
        className,
      )}
      minLength={2}
      maxLength={65}
      rows={1}
      onChange={(e) => {
        const value = e.target.value.replace(/\n/g, "");
        e.target.value = value;
        if (onChange) onChange(e);
      }}
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if ("value" in e.target && onValueOnlyInput) {
          const title = e.target.value;
          onValueOnlyInput(title);
        }
      }}
      defaultValue={defaultValue || String(children)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\n/g, "");
        document.execCommand("insertText", false, text);
      }}
    />
    <div className="sr-only">
      <DiaryEditDialogPrimitive.Title />
    </div>
  </>
);
DiaryEditDialogTitle.displayName = DiaryEditDialogPrimitive.Title.displayName;

export {
  DiaryEditDialog,
  DiaryEditDialogClose,
  DiaryEditDialogContent,
  DiaryEditDialogFooter,
  DiaryEditDialogHeader,
  DiaryEditDialogOverlay,
  DiaryEditDialogPortal,
  DiaryEditDialogTitle,
  DiaryEditDialogTrigger,
};
