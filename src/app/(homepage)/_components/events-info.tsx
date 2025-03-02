export const EventsInfo = ({ eventsCount }: { eventsCount: number }) => {
  return (
    <div className="flex w-full items-center gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <h2 className="text-xl">So far you have made</h2>
      <span className="text-3xl">{eventsCount}</span>

      <h2 className="text-xl">events</h2>
    </div>
  );
};
