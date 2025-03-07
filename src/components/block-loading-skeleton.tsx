import { Skeleton } from "./ui/skeleton";

export const BlockLoadingSkeleton = ({ height = 6 }: { height?: number }) => {
  const heightVariants: Record<number, string> = {
    6: "h-6",
    220: "h-[220px]",
  };
  return (
    <div className="flex w-full items-center gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <Skeleton className={`${heightVariants[height]} w-full`} />
    </div>
  );
};
