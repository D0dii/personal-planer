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
  onSubmit: (
    formData: FormData,
    startTime: string,
    endTime: string,
    date: Date,
  ) => Promise<Event | null>;
}) => {
  const [date, setDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState("14:00");
  const [endTime, setEndTime] = React.useState("14:30");
  const onDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };
  const onFormSubmit = async (formData: FormData) => {
    const newEvent = await onSubmit(formData, startTime, endTime, date);
    if (!newEvent) {
      return alert("Something went wrong");
    }
    setStartTime("14:00");
    setEndTime("14:30");
    setDate(new Date());
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
