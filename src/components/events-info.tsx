"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getAllEventsCount } from "@/helpers/get-all-events-count";

const EventsInfo = () => {
  const [allEventsCount, setAllEventsCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setAllEventsCount(getAllEventsCount());
    setIsLoading(false);
  }, []);

  return (
    <div className="flex w-full items-baseline gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <h2 className="text-xl">So far you have made</h2>
      {isLoading ? (
        <Skeleton className="h-[29px] w-56" />
      ) : (
        <span className="text-3xl">{allEventsCount}</span>
      )}
      <h2 className="text-xl">events</h2>
    </div>
  );
};

export { EventsInfo };
