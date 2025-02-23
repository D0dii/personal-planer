import { EventsInfo } from "./_components/events-info";
import { RecentSpendings } from "./_components/recent-spendings";
import { SpendingsInfo } from "./_components/spendings-info";
import { UpcomingEvents } from "./_components/upcoming-events";
import { WeeklySpendingsChart } from "./_components/weekly-spendings-chart";

export default async function HomePage() {
  return (
    <div className="flex flex-col justify-center gap-6 py-6 md:px-10">
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
        <UpcomingEvents />
        <RecentSpendings />
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-20">
        <EventsInfo />
        <SpendingsInfo />
      </div>
      <WeeklySpendingsChart />
    </div>
  );
}
