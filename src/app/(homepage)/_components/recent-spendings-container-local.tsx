"use client";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Spending } from "@/types/spending";

import { RecentSpendings } from "./recent-spendings";

export const RecentSpendingsContainerLocal = () => {
  const { value: recentSpendings, isLoading } = useLocalStorage<Spending[]>(
    "personal-planer-spendings",
    [],
  );
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <RecentSpendings
      recentSpendings={recentSpendings
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5)}
    />
  );
};
