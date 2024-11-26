"use client";

import React from "react";

import { Spending } from "@/app/types/spending";

interface SpendingDay {
  date: Date;
  amount: number;
}

const calcuateDailyExpensesFromMonth = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalExpenses: SpendingDay[] = [];

  for (let i = 1; i <= 31; i++) {
    const date = new Date(currentYear, currentMonth, i);
    if (date.getMonth() !== currentMonth) break;

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    totalExpenses.push({
      date,
      amount: spendings.reduce((sum, spending) => sum + spending.amount, 0),
    });
  }

  return totalExpenses;
};

const SpendingsInfo = () => {
  const [totalExpenses, setTotalExpenses] = React.useState([] as SpendingDay[]);
  React.useEffect(() => {
    setTotalExpenses(calcuateDailyExpensesFromMonth());
  }, []);
  return (
    <div className="flex w-full items-baseline gap-5 self-start rounded-lg bg-white p-10 dark:bg-zinc-900">
      <h2 className="text-xl">In this month you have spent </h2>
      <span className="text-3xl">
        ${totalExpenses.reduce((sum, spending) => sum + spending.amount, 0)}
      </span>
    </div>
  );
};

export { SpendingsInfo };
