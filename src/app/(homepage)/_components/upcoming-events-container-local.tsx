"use client";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Event } from "@/types/event";

import { UpcomingEvents } from "./upcoming-events";

export const UpcomingEventsContainerLocal = () => {
  const { value: upcomingEvents, isLoading } = useLocalStorage<Event[]>(
    "personal-planer-events",
    [],
  );
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <UpcomingEvents
      upcomingEvents={upcomingEvents
        .filter((event) => {
          return new Date(event.start).getTime() >= new Date().getTime();
        })
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .slice(0, 5)}
    />
  );
};
