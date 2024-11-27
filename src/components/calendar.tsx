"use client";

import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const myEventsList = [
    {
      title: "Meeting",
      start: new Date(2023, 10, 20, 10, 0), // November 20, 2023 10:00 AM
      end: new Date(2023, 10, 20, 12, 0), // November 20, 2023 12:00 PM
    },
    {
      title: "Lunch Break",
      start: new Date(2023, 10, 21, 13, 0), // November 21, 2023 1:00 PM
      end: new Date(2023, 10, 21, 14, 0), // November 21, 2023 2:00 PM
    },
    {
      title: "Conference",
      start: new Date(2023, 10, 22, 9, 0), // November 22, 2023 9:00 AM
      end: new Date(2023, 10, 22, 17, 0), // November 22, 2023 5:00 PM
    },
  ];
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export { MyCalendar };
