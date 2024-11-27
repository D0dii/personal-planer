"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={[
        { title: "event 1", date: "2024-11-27" },
        { title: "event 2", date: "2024-11-26" },
      ]}
    />
  );
};

export { Calendar };
