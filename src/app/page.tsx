import { Chart } from "@/components/chart";
import { InfoBlock } from "@/components/info-block";
import { RecentSpendings } from "@/components/recent-spendings";
import { SpendingsInfo } from "@/components/spendings-info";

export default function Home() {
  return (
    <main className="flex flex-col items-center pb-8">
      <h1 className="mb-20 mt-8 text-5xl">Welcome to Personal Planer!</h1>
      <h2 className="mb-14 text-4xl">So far you have made:</h2>
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
        <InfoBlock title="Spendings" number={450} href="/spendings" />
        <InfoBlock title="Events" number={320} href="/calendar" />
      </div>
      <RecentSpendings />
      <Chart />
      <SpendingsInfo />
    </main>
  );
}
