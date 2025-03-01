"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { User } from "next-auth";
import { useState } from "react";

import { createEvent, deleteEvent, updateEvent } from "@/actions/event";
import { extractTime } from "@/helpers/extract-time";
import { Event } from "@/types/event";

import { createUpdateEvent } from "./calendar-container-local";
import { DialogEditEvent } from "./dialog-edit-event";
import { DialogNewEvent } from "./dialog-new-event";

export const CalendarContainerServerClient = ({
  user,
  initialEvents,
}: {
  user: User;
  initialEvents: Event[];
}) => {
  const [events, setEvents] = useState(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
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
    const event = await createEvent({
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      userId: user.id!,
    });
    if (!event) {
      return null;
    }
    setEvents([...events, newEvent]);
    return newEvent;
  };
  const updateEventClient = async (
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
    const event = await updateEvent(id, {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      userId: user.id!,
    });
    if (!event) {
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
        onSubmit={updateEventClient}
        deleteEvent={async () => {
          const newEvents = events.filter(
            (event) => event.id !== editEvent?.id,
          );
          await deleteEvent(editEvent!.id);
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
