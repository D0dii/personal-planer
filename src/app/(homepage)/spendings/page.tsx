import type { Metadata } from "next";
import React from "react";

import { auth } from "@/auth";

import { SpendingsContainerLocal } from "./_components/spendings-container-local";
import { SpendingsContainerServer } from "./_components/spendings-container-server";

export const metadata: Metadata = {
  title: "Spendings",
  description: "List of your todays spendings",
};

export default async function SpendingsPage() {
  const session = await auth();
  if (session && session.user) {
    return <SpendingsContainerServer user={session.user} />;
  }
  return <SpendingsContainerLocal />;
}
