"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Spending } from "@/types/spending";

import { WeeklySpendingsChart } from "./weekly-spendings-chart";

export const WeeklySpendingsChartContainerLocal = () => {
  const { value: spendings, isLoading } = useLocalStorage<Spending[]>(
    "personal-planer-spendings",
    [],
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <WeeklySpendingsChart
      lastWeekSpendings={spendings.filter(
        (spending) =>
          spending.date >=
            new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) &&
          spending.date <= new Date(),
      )}
    />
  );
};
