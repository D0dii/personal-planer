"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Event } from "@/types/event";

import { TimePicker } from "./time-picker";

export const DialogEditEvent = ({
  isOpen,
  setIsOpen,
  onSubmit,
  deleteEvent,
  id,
  title,
  initialDate,
  initialStartTime,
  initialEndTime,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
  onSubmit: (newEvent: Event) => void;
  deleteEvent: () => void;
  id: string;
  title: string;
  initialDate: Date;
  initialStartTime: string;
  initialEndTime: string;
}) => {
  const [date, setDate] = React.useState<Date>(initialDate);
  const [startTime, setStartTime] = React.useState<string>(initialStartTime);
  const [endTime, setEndTime] = React.useState<string>(initialEndTime);
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

    const newEvent = {
      id,
      title: formData.get("event-title") as string,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    } satisfies Event;
    onSubmit(newEvent);
    setIsOpen();
  };
  React.useEffect(() => {
    if (isOpen) {
      setDate(initialDate);
      setStartTime(initialStartTime);
      setEndTime(initialEndTime);
    }
  }, [initialDate, initialEndTime, initialStartTime, isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Here you can edit event in your calendar
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
              defaultValue={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Select date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateSelect}
              className="rounded-md border bg-white dark:border-none dark:bg-zinc-900"
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete event</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteEvent}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="submit">Edit event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
