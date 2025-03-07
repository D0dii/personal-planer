import { Skeleton } from "./ui/skeleton";

export const BlockLoadingSkeleton = ({ height = "6" }: { height?: string }) => {
  return (
    <div className="flex w-full items-center gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <Skeleton className={`h-${height} w-full`} />
    </div>
  );
};
