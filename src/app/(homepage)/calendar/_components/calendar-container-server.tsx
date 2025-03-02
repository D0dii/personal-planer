import { User } from "next-auth";

import { getUserEvents } from "@/actions/event";

import { CalendarContainerServerClient } from "./calendar-container-server-client";

export const CalendarContainerServer = async ({ user }: { user: User }) => {
  const events = await getUserEvents(user.id!);
  return <CalendarContainerServerClient user={user} initialEvents={events} />;
};
