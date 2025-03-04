"use client";

import { BlockLoadingSkeleton } from "@/components/block-loading-skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Event } from "@/types/event";

import { EventsInfo } from "./events-info";

export const EventsInfoContainerLocal = () => {
  const { value: events, isLoading } = useLocalStorage<Event[]>(
    "personal-planer-events",
    [],
  );
  if (isLoading) {
    return <BlockLoadingSkeleton />;
  }

  return <EventsInfo eventsCount={events.length} />;
};
