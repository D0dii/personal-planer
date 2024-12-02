import React from "react";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const DatePicker24 = ({
  initialDate,
  updateExternalDate,
}: {
  initialDate: Date;
  updateExternalDate: (date: Date) => void;
}) => {
  const [date, setDate] = React.useState<Date>(initialDate);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      updateExternalDate(selectedDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
      updateExternalDate(newDate);
    }
  };
  return (
    <div className="sm:flex">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md bg-white dark:bg-zinc-900"
      />
      <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex p-2 sm:flex-col">
            {hours.reverse().map((hour) => (
              <Button
                key={hour}
                size="icon"
                variant={date && date.getHours() === hour ? "default" : "ghost"}
                className="aspect-square shrink-0 sm:w-full"
                onClick={() => handleTimeChange("hour", hour.toString())}
                type="button"
              >
                {hour}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex p-2 sm:flex-col">
            {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
              <Button
                key={minute}
                size="icon"
                variant={
                  date && date.getMinutes() === minute ? "default" : "ghost"
                }
                className="aspect-square shrink-0 sm:w-full"
                onClick={() => handleTimeChange("minute", minute.toString())}
                type="button"
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};

export { DatePicker24 };
