import { User } from "next-auth";

import { getUserUpcomingEvents } from "@/actions/event";

import { UpcomingEvents } from "./upcoming-events";

export const UpcomingEventsContainerServer = async ({
  user,
}: {
  user: User;
}) => {
  const upcomingEvents = await getUserUpcomingEvents(user.id!);
  return <UpcomingEvents upcomingEvents={upcomingEvents} />;
};
