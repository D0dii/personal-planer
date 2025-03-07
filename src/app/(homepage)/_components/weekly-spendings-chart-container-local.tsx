"use client";

import { useMemo } from "react";

import { BlockLoadingSkeleton } from "@/components/block-loading-skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Spending } from "@/types/spending";

import { WeeklySpendingsChart } from "./weekly-spendings-chart";

export const WeeklySpendingsChartContainerLocal = () => {
  const { value: spendings, isLoading } = useLocalStorage<Spending[]>(
    "personal-planer-spendings",
    [],
  );
  const filteredSpendings = useMemo(() => {
    return spendings.filter(
      (spending) =>
        spending.date >=
          new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) &&
        spending.date <= new Date(),
    );
  }, [spendings]);

  const groupedSpendings = useMemo(() => {
    return Map.groupBy(filteredSpendings, (spending) =>
      spending.date.toDateString(),
    );
  }, [filteredSpendings]);

  const spendingSummary = useMemo(() => {
    const s: { date: Date; amount: number }[] = [];
    groupedSpendings.forEach((spendings, key) =>
      s.push({
        date: new Date(key),
        amount: spendings.reduce((sum, spending) => sum + spending.amount, 0),
      }),
    );
    return s;
  }, [groupedSpendings]);

  if (isLoading) {
    return <BlockLoadingSkeleton height={"chart-loading"} />;
  }

  return <WeeklySpendingsChart lastWeekSpendings={spendingSummary} />;
};
