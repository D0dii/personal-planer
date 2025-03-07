import { Metadata } from "next";
import { Suspense } from "react";

import { auth } from "@/auth";
import { BlockLoadingSkeleton } from "@/components/block-loading-skeleton";
import { LoadingSkeleton } from "@/components/loading-skeleton";

import { EventsInfoContainerLocal } from "./_components/events-info-container-local";
import { EventsInfoContainerServer } from "./_components/events-info-container-server";
import { RecentSpendingsContainerLocal } from "./_components/recent-spendings-container-local";
import { RecentSpendingsContainerServer } from "./_components/recent-spendings-container-server";
import { SpendingsInfoContainerLocal } from "./_components/spendings-info-container-local";
import { SpendingsInfoContainerServer } from "./_components/spendings-info-container-server";
import { UpcomingEventsContainerLocal } from "./_components/upcoming-events-container-local";
import { UpcomingEventsContainerServer } from "./_components/upcoming-events-container-server";
import { WeeklySpendingsChartContainerLocal } from "./_components/weekly-spendings-chart-container-local";
import { WeeklySpendingsChartContainerServer } from "./_components/weekly-spendings-chart-container-server";

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
          <Suspense fallback={<BlockLoadingSkeleton />}>
            <EventsInfoContainerServer user={session.user} />
          </Suspense>
          <Suspense fallback={<BlockLoadingSkeleton />}>
            <SpendingsInfoContainerServer user={session.user} />
          </Suspense>
        </div>
        <Suspense fallback={<BlockLoadingSkeleton height={220} />}>
          <WeeklySpendingsChartContainerServer user={session.user} />
        </Suspense>
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
        <EventsInfoContainerLocal />
        <SpendingsInfoContainerLocal />
      </div>
      <WeeklySpendingsChartContainerLocal />
    </div>
  );
}
