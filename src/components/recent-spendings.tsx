"use client";

import React from "react";

import type { SpendingDay } from "./chart";
import { getLastWeekExpenses } from "./chart";

const RecentSpendings = () => {
  const [totalExpenses, setTotalExpenses] = React.useState([] as SpendingDay[]);
  React.useEffect(() => {
    const expenses = getLastWeekExpenses().flat();
    //expenses.sort((a, b) => a.date - b.date);
    setTotalExpenses(expenses);
  }, []);
  console.log(totalExpenses);
  return (
    <div>
      {totalExpenses.map((expense) => (
        <div key={expense.date}>{`${expense.date} - ${expense.amount}`}</div>
      ))}
    </div>
  );
};

export { RecentSpendings };
