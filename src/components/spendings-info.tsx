"use client";

import React from "react";

import { Spending } from "@/app/types/spending";

interface SpendingDay {
  date: Date;
  amount: number;
}

//Mon Nov 25 2024
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
  console.log(totalExpenses);
  return (
    <div>
      {totalExpenses.reduce((sum, spending) => sum + spending.amount, 0)}
    </div>
  );
};

export { SpendingsInfo };
