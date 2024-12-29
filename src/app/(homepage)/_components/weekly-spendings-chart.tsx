"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { getLastWeekExpenses } from "@/helpers/get-last-week-expenses";
import { SpendingDay } from "@/types/spending-day";

const chartConfig = {
  desktop: {
    label: "Expenses",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const WeeklySpendingsChart = () => {
  const [totalExpenses, setTotalExpenses] = React.useState([] as SpendingDay[]);
  React.useEffect(() => {
    setTotalExpenses(getLastWeekExpenses());
  }, []);
  return (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Your last week spendings</h2>
      <ChartContainer
        config={chartConfig}
        className="max-h-[300px] min-h-[200px] w-full rounded-md bg-white dark:bg-zinc-900"
      >
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
    </div>
  );
};
