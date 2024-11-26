import { RecentSpendings } from "@/components/recent-spendings";
import { SpendingsInfo } from "@/components/spendings-info";
import { WeeklySpendingsChart } from "@/components/weekly-spendings-chart";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 pb-16 pt-10 md:px-10">
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-20">
        <RecentSpendings />
        <RecentSpendings />
      </div>
      <div className="flex w-full flex-col gap-6 md:flex-row md:gap-20">
        <SpendingsInfo />
        <SpendingsInfo />
      </div>
      <WeeklySpendingsChart />
    </div>
  );
}
