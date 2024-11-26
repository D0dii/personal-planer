"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Spending } from "@/app/types/spending";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface SpendingDay {
  date: number;
  amount: number;
}

//Mon Nov 25 2024
const getLastWeekExpenses = () => {
  const today = new Date();
  const totalExpenses: SpendingDay[] = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    totalExpenses.push({
      date: date.getDate(),
      amount: spendings.reduce((sum, spending) => sum + spending.amount, 0),
    });
  }

  return totalExpenses;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const Chart = () => {
  const [totalExpenses, setTotalExpenses] = React.useState([] as SpendingDay[]);
  React.useEffect(() => {
    setTotalExpenses(getLastWeekExpenses());
  }, []);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={totalExpenses}>
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <Bar dataKey="amount" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export { Chart, getLastWeekExpenses };
export type { SpendingDay };
