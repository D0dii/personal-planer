"use client";

import * as React from "react";

import { Event } from "@/app/types/event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TimePicker } from "./time-picker";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const DialogNewEvent = ({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
  onSubmit: (newEvent: Event) => void;
}) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [startTime, setStartTime] = React.useState<string>(
    date.getHours() + ":" + date.getMinutes(),
  );
  const [endTime, setEndTime] = React.useState<string>(
    date.getHours() + ":" + (date.getMinutes() + 30),
  );
  const onDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };
  const onFormSubmit = (formData: FormData) => {
    const startDateTime = new Date(date);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(date);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute);

    const newEvent: Event = {
      title: formData.get("event-title") as string,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    };
    setStartTime(new Date().getHours() + ":" + new Date().getMinutes());
    setEndTime(new Date().getHours() + ":" + (new Date().getMinutes() + 30));
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
          <Label htmlFor="event-title">Event title</Label>
          <Input name="event-title" placeholder="Event title" required />
          <Label>Select date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            className="rounded-md bg-white dark:bg-zinc-900"
          />
          <div className="flex gap-4">
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

export { DialogNewEvent };
