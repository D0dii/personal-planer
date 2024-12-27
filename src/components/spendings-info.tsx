"use client";

import React from "react";

import { Expense } from "@/app/types/expense";
import { Skeleton } from "@/components/ui/skeleton";
import { calcuateDailyExpensesFromMonth } from "@/helpers/calculate-daily-expenses-from-month";

const SpendingsInfo = () => {
  const [totalExpenses, setTotalExpenses] = React.useState([] as Expense[]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTotalExpenses(calcuateDailyExpensesFromMonth());
    setIsLoading(false);
  }, []);

  return (
    <div className="flex w-full items-center gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <h2 className="text-xl">In this month you have spent </h2>
      {isLoading ? (
        <Skeleton className="h-[29px] w-56" />
      ) : (
        <span className="text-3xl">
          $
          {totalExpenses
            .reduce((sum, spending) => sum + spending.amount, 0)
            .toFixed(2)}
        </span>
      )}
    </div>
  );
};

export { SpendingsInfo };
