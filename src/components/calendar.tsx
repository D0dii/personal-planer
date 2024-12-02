"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";

import { Event } from "@/app/types/event";
import { DialogNewEvent } from "@/components/dialog-new-event";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Calendar = () => {
  const { value: events, setNewValue: setEvents } = useLocalStorage<Event[]>(
    "personal-planer-events",
    React.useMemo(() => [], []),
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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
        //TODO add on event click edit/delete
        height={750}
        events={events}
      />
      <DialogNewEvent
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
        onSubmit={(newEvent: Event) => {
          setEvents([...events, newEvent]);
        }}
      />
    </div>
  );
};

export { Calendar };
