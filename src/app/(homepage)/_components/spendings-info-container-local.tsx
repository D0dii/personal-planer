"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Spending } from "@/types/spending";

import { SpendingsInfo } from "./spendings-info";

export const SpendingsInfoContainerLocal = () => {
  const { value: spendings, isLoading } = useLocalStorage<Spending[]>(
    "personal-planer-spendings",
    [],
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SpendingsInfo
      monthlyAmountSpent={spendings
        .filter(
          (spending) =>
            spending.date.getMonth() === new Date().getMonth() &&
            spending.date.getFullYear() === new Date().getFullYear(),
        )
        .reduce((sum, spending) => sum + spending.amount, 0)}
    />
  );
};
