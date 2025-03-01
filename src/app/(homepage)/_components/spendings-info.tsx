export const SpendingsInfo = ({
  monthlyAmountSpent,
}: {
  monthlyAmountSpent: number;
}) => {
  return (
    <div className="flex w-full items-center gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <h2 className="text-xl">In this month you have spent </h2>
      <span className="text-3xl">{monthlyAmountSpent.toFixed(2)}</span>
    </div>
  );
};
