import type { Metadata } from "next";
import React from "react";

import { DateProvider } from "@/app/store/date-provider";
import { SpendingsProvider } from "@/app/store/spendings-provider";
import { auth } from "@/auth";

import { SpendingsFormWrapper } from "./_components/spending-wrappers";
import { SpendingsClient } from "./page.client";

export const metadata: Metadata = {
  title: "Spendings",
  description: "List of your todays spendings",
};

export default async function SpendingsPage() {
  const session = await auth();

  return (
    <SpendingsFormWrapper user={session?.user}>
      <DateProvider date={new Date()}>
        <SpendingsProvider spendings={[]}>
          <SpendingsClient />
        </SpendingsProvider>
      </DateProvider>
    </SpendingsFormWrapper>
  );
}
