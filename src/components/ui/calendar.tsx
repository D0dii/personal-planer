"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "rounded-md p-0 relative [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 font-normal aria-selected:opacity-100 !ring-offset-0 !ring-0 !outline-offset-2 !outline-2 !outline-slate-200"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "!bg-slate-900 !text-slate-50 hover:!bg-slate-900 hover:!text-slate-50 dark:!bg-slate-50 dark:!text-slate-900 dark:hover:!bg-slate-50 dark:hover:!text-slate-900",
        day_today: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
