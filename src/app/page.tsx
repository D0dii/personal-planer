import { EventsInfo } from "@/components/events-info";
import { RecentSpendings } from "@/components/recent-spendings";
import { SpendingsInfo } from "@/components/spendings-info";
import { UpcomingEvents } from "@/components/upcoming-events";
import { WeeklySpendingsChart } from "@/components/weekly-spendings-chart";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-6 pb-16 pt-10 md:px-10">
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-20">
        <UpcomingEvents />
        <RecentSpendings />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-20">
        <EventsInfo />
        <SpendingsInfo />
      </div>
      <WeeklySpendingsChart />
    </div>
  );
}
