"use client";

import * as React from "react";

import { Input } from "@/components//ui/input";
import { Label } from "@/components//ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTimeForEvent } from "@/helpers/get-time-for-event";
import { newEventSchema } from "@/lib/zod";
import { Event } from "@/types/event";

import { TimePicker } from "./time-picker";

export const DialogNewEvent = ({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
  onSubmit: (newEvent: Event) => void;
}) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [startTime, setStartTime] = React.useState<string>("14:00");
  const [endTime, setEndTime] = React.useState<string>("14:30");
  const onDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };
  const onFormSubmit = (formData: FormData) => {
    const startDateTime = getTimeForEvent(startTime, date);
    const endDateTime = getTimeForEvent(endTime, date);

    const validation = newEventSchema
      .pick({
        title: true,
      })
      .safeParse({
        title: formData.get("event-title"),
      });
    if (!validation.success) {
      alert(validation.error.message);
      return;
    }
    const newEvent = {
      id: crypto.randomUUID(),
      ...validation.data,
      start: startDateTime,
      end: endDateTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies Event;
    console.log(newEvent);
    setStartTime("14:00");
    setEndTime("14:30");
    setDate(new Date());
    onSubmit(newEvent);
    setIsOpen();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Add new event</DialogTitle>
          <DialogDescription>
            Here you can add a new event to your calendar
          </DialogDescription>
        </DialogHeader>
        <form action={onFormSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-title">Event title</Label>
            <Input
              name="event-title"
              id="event-title"
              placeholder="Event title"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateSelect}
              className="w-full rounded-md border bg-white dark:border-none dark:bg-zinc-900"
            />
          </div>
          <div className="flex justify-between gap-4">
            <TimePicker
              time={startTime}
              onTimeChange={setStartTime}
              label="Select start time"
            />
            <TimePicker
              time={endTime}
              onTimeChange={setEndTime}
              label="Select end time"
            />
          </div>
          <Button type="submit">Add new event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
