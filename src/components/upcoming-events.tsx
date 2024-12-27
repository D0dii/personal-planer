"use client";

import React from "react";

import { Event } from "@/app/types/event";
import { changeIsoDateToNormalFormat } from "@/helpers/change-iso-date-to-normal";
import { getUpcomingEvents } from "@/helpers/get-upcoming-events";

import { LoadingSkeleton } from "./loading-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = React.useState([] as Event[]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const events = getUpcomingEvents();
    setUpcomingEvents(events);
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingSkeleton />;
  }
  return upcomingEvents.length === 0 ? (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Upcoming events</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="h-14 text-center text-xl">
              {"You don't have any upcoming events"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Upcoming events</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingEvents.map((event) => (
            <TableRow key={event.id} className="border-0">
              <TableCell>{event.title}</TableCell>
              <TableCell>{changeIsoDateToNormalFormat(event.start)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { UpcomingEvents };
