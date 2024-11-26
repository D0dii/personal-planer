import { RecentSpendings } from "@/components/recent-spendings";
import { SpendingsInfo } from "@/components/spendings-info";
import { WeeklySpendingsChart } from "@/components/weekly-spendings-chart";

export default function Home() {
  return (
    <main className="mt-10 flex flex-col items-center gap-6 px-10 pb-8">
      <div className="flex w-full gap-20">
        <RecentSpendings />
        <RecentSpendings />
      </div>
      <div className="flex w-full gap-20">
        <SpendingsInfo />
        <SpendingsInfo />
      </div>
      <WeeklySpendingsChart />
    </main>
  );
}
