"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

import { Event } from "@/app/types/event";
import { DialogNewEvent } from "@/components/dialog-new-event";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { DialogEditEvent } from "./dialog-edit-event";

const Calendar = () => {
  const { value: events, setNewValue: setEvents } = useLocalStorage<Event[]>(
    "personal-planer-events",
    //Without it the component renders all time
    React.useMemo(() => [], []),
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState<Event | null>(null);
  return (
    <div>
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
        onSubmit={(newEvent: Event) => {
          setEvents([...events, newEvent]);
        }}
      />
      <DialogEditEvent
        isOpen={isEditDialogOpen}
        setIsOpen={() => setIsEditDialogOpen(!isEditDialogOpen)}
        onSubmit={(newEvent: Event) => {
          const newEvents = events.map((event) =>
            event.id === newEvent.id ? newEvent : event,
          );
          setEvents(newEvents);
        }}
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
        initialStartTime={editEvent ? extractTime(editEvent.start) : ""}
        initialEndTime={editEvent ? extractTime(editEvent.end) : ""}
      />
    </div>
  );
};

const extractTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export { Calendar };
