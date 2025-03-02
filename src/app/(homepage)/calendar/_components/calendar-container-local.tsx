"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

import { extractTime } from "@/helpers/extract-time";
import { getTimeForEvent } from "@/helpers/get-time-for-event";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { newEventSchema } from "@/lib/zod";
import { Event } from "@/types/event";

import { DialogEditEvent } from "./dialog-edit-event";
import { DialogNewEvent } from "./dialog-new-event";

export const createUpdateEvent = async (
  formData: FormData,
  startTime: string,
  endTime: string,
  date: Date,
  id: string,
) => {
  const validation = newEventSchema
    .pick({
      title: true,
    })
    .safeParse({
      title: formData.get("event-title"),
    });
  if (!validation.success) {
    alert(validation.error.message);
    return null;
  }
  const startDateTime = getTimeForEvent(startTime, date);
  const endDateTime = getTimeForEvent(endTime, date);

  const newEvent = {
    id,
    ...validation.data,
    start: startDateTime,
    end: endDateTime,
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies Event;
  return newEvent;
};

export const CalendarContainerLocal = () => {
  const { value: events, setNewValue: setEvents } = useLocalStorage<Event[]>(
    "personal-planer-events",
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState<Event | null>(null);
  const createNewEvent = async (
    formData: FormData,
    startTime: string,
    endTime: string,
    date: Date,
  ) => {
    const newEvent = await createUpdateEvent(
      formData,
      startTime,
      endTime,
      date,
      crypto.randomUUID(),
    );
    if (!newEvent) {
      return null;
    }
    setEvents([...events, newEvent]);
    return newEvent;
  };
  const updateEvent = async (
    formData: FormData,
    startTime: string,
    endTime: string,
    date: Date,
    id: string,
  ) => {
    const newEvent = await createUpdateEvent(
      formData,
      startTime,
      endTime,
      date,
      id,
    );
    if (!newEvent) {
      return null;
    }
    setEvents(events.map((event) => (event.id === id ? newEvent : event)));
    return newEvent;
  };
  return (
    <div className="px-2 py-6 lg:px-20">
      <FullCalendar
        customButtons={{
          addCustomButton: {
            text: "Add new event",
            click: () => {
              setIsDialogOpen(true);
            },
          },
        }}
        eventContent
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        headerToolbar={{
          left: "prev,next today addCustomButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) => {
          setEditEvent(
            events.find((event) => event.id === info.event.id) ?? null,
          );
          setIsEditDialogOpen(true);
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        height={750}
        events={events}
        editable={true}
      />
      <DialogNewEvent
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        onSubmit={createNewEvent}
      />
      <DialogEditEvent
        isOpen={isEditDialogOpen}
        setIsOpen={() => setIsEditDialogOpen(!isEditDialogOpen)}
        onSubmit={updateEvent}
        deleteEvent={() => {
          const newEvents = events.filter(
            (event) => event.id !== editEvent?.id,
          );
          setEvents(newEvents);
          setIsEditDialogOpen(false);
        }}
        id={editEvent?.id ?? ""}
        title={editEvent?.title ?? ""}
        initialDate={editEvent ? new Date(editEvent.start) : new Date()}
        initialStartTime={
          editEvent ? extractTime(editEvent.start as unknown as string) : ""
        }
        initialEndTime={
          editEvent ? extractTime(editEvent.end as unknown as string) : ""
        }
      />
    </div>
  );
};
