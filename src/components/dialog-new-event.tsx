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

import { DatePicker24 } from "./date-picker-24";
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
  const startDate = React.useRef(new Date());
  const endDate = React.useRef(new Date());
  const setStartDate = (date: Date) => {
    startDate.current = date;
  };
  const setEndDate = (date: Date) => {
    endDate.current = date;
  };
  const onFormSubmit = (formData: FormData) => {
    const newEvent: Event = {
      title: formData.get("event-title") as string,
      start: startDate.current.toISOString(),
      end: endDate.current.toISOString(),
    };
    startDate.current = new Date();
    endDate.current = new Date();
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
          <Label>Start date</Label>
          <DatePicker24
            initialDate={startDate.current}
            updateExternalDate={setStartDate}
          />
          <Label>End date</Label>
          <DatePicker24
            initialDate={endDate.current}
            updateExternalDate={setEndDate}
          />
          <Button type="submit">Add new event</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { DialogNewEvent };
