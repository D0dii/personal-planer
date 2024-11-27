"use client";

import React from "react";

import { Spending } from "@/app/types/spending";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getRecentExpenses = () => {
  const today = new Date();
  let allExpenses: Spending[] = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    allExpenses = [...allExpenses, ...spendings];
  }
  return allExpenses
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
};

const changeIsoDateToNormalFormat = (date: string) => {
  const newDate = new Date(date);
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return (
    newDate.toLocaleDateString("en-US", optionsDate) +
    " " +
    newDate.toLocaleTimeString("en-US", optionsTime)
  );
};

const RecentSpendings = () => {
  const [recentExpenses, setRecentExpenses] = React.useState([] as Spending[]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const expenses = getRecentExpenses();
    setRecentExpenses(expenses);
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return recentExpenses.length === 0 ? (
    <Table className="rounded-lg bg-white dark:bg-zinc-900">
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-14 text-center text-xl">
            {"You haven't spent anything in the last 7 days"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <Table className="rounded-lg bg-white dark:bg-zinc-900">
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentExpenses.map((expense) => (
          <TableRow key={expense.id} className="border-0">
            <TableCell>{expense.description}</TableCell>
            <TableCell>
              {changeIsoDateToNormalFormat(expense.createdAt)}
            </TableCell>
            <TableCell className="text-right">{expense.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { RecentSpendings };
