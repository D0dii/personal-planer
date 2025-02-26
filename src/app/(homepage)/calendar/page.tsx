import type { Metadata } from "next";
import React from "react";

import { auth } from "@/auth";

import { CalendarContainerLocal } from "./_components/calendar-container-local";
import { CalendarContainerServer } from "./_components/calendar-container-server";

export const metadata: Metadata = {
  title: "Calendar",
  description: "List of your meetings",
};

export default async function CalendarPage() {
  const session = await auth();
  if (session && session.user) {
    return <CalendarContainerServer user={session.user} />;
  }
  return <CalendarContainerLocal />;
}
