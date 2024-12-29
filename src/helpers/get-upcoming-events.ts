import type { Event } from "@/types/event";

export const getUpcomingEvents = () => {
  const events = JSON.parse(
    localStorage.getItem("personal-planer-events") || "[]",
  ) as Event[];

  const upcomingEvents = events.filter((event) => {
    return new Date(event.start).getTime() >= new Date().getTime();
  });
  upcomingEvents.sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  return upcomingEvents.slice(0, 5);
};
