"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spending } from "@/types/spending";

const chartConfig = {
  desktop: {
    label: "Spendings",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const WeeklySpendingsChart = ({
  lastWeekSpendings,
}: {
  lastWeekSpendings: Spending[];
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Your last week spendings</h2>
      <ChartContainer
        config={chartConfig}
        className="max-h-[300px] min-h-[200px] w-full rounded-md bg-white dark:bg-zinc-900"
      >
        <BarChart
          accessibilityLayer
          data={lastWeekSpendings.map((spending) => ({
            date: spending.date.toDateString(),
            Amount: spending.amount,
          }))}
        >
          <ChartTooltip content={<ChartTooltipContent />} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis />
          <Bar dataKey="Amount" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
