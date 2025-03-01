import { User } from "next-auth";

import { getUserLastWeekSpendings } from "@/actions/spending";

import { WeeklySpendingsChart } from "./weekly-spendings-chart";

export const WeeklySpendingsChartContainerServer = async ({
  user,
}: {
  user: User;
}) => {
  const lastWeekSpendings = await getUserLastWeekSpendings(user.id!);
  return <WeeklySpendingsChart lastWeekSpendings={lastWeekSpendings} />;
};
