import { User } from "next-auth";

import { getUserEvents } from "@/actions/event";

import { EventsInfo } from "./events-info";

export const EventsInfoContainerServer = async ({ user }: { user: User }) => {
  const events = await getUserEvents(user.id!);
  return <EventsInfo eventsCount={events.length} />;
};
