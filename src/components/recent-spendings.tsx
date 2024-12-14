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
import { changeIsoDateToNormalFormat } from "@/helpers/change-iso-date-to-normal";
import { getRecentExpenses } from "@/helpers/get-recent-spendings";

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
    <Table>
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
    <Table>
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
