import { User } from "next-auth";

import { getUserMonthlySpendingsAmount } from "@/actions/spending";

import { SpendingsInfo } from "./spendings-info";

export const SpendingsInfoContainerServer = async ({
  user,
}: {
  user: User;
}) => {
  const monthlyAmountSpent = await getUserMonthlySpendingsAmount(user.id!);
  return <SpendingsInfo monthlyAmountSpent={monthlyAmountSpent} />;
};
