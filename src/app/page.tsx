import { InfoBlock } from "@/components/info-block";

export default function Home() {
  return (
    <main className="flex flex-col items-center pb-8">
      <h1 className="text-5xl mt-8 mb-20">Welcome to Personal Planer!</h1>
      <h2 className="text-4xl mb-14">So far you have made:</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <InfoBlock title="Spendings" number={450} href="/spendings" />
        <InfoBlock title="Events" number={320} href="/calendar" />
      </div>
    </main>
  );
}
