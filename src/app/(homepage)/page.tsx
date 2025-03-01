import { Metadata } from "next";
import { Suspense } from "react";

import { auth } from "@/auth";
import { LoadingSkeleton } from "@/components/loading-skeleton";

import { EventsInfo } from "./_components/events-info";
import { RecentSpendingsContainerLocal } from "./_components/recent-spendings-container-local";
import { RecentSpendingsContainerServer } from "./_components/recent-spendings-container-server";
import { SpendingsInfo } from "./_components/spendings-info";
import { UpcomingEvents } from "./_components/upcoming-events";
import { UpcomingEventsContainerLocal } from "./_components/upcoming-events-container-local";
import { UpcomingEventsContainerServer } from "./_components/upcoming-events-container-server";
import { WeeklySpendingsChart } from "./_components/weekly-spendings-chart";

export const metadata: Metadata = {
  title: "Personal planer",
  description: "Application for planning your spendings and events",
};

export default async function HomePage() {
  const session = await auth();
  if (session && session.user) {
    return (
      <div className="flex flex-col justify-center gap-6 py-6 md:px-10">
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
          <Suspense fallback={<LoadingSkeleton />}>
            <UpcomingEventsContainerServer user={session.user} />
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <RecentSpendingsContainerServer user={session.user} />
          </Suspense>
        </div>
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
          <EventsInfo />
          <SpendingsInfo />
        </div>
        <WeeklySpendingsChart />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center gap-6 py-6 md:px-10">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
        <UpcomingEventsContainerLocal />
        <RecentSpendingsContainerLocal />
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
        <EventsInfo />
        <SpendingsInfo />
      </div>
      <WeeklySpendingsChart />
    </div>
  );
}
