import { User } from "next-auth";

import { getUserRecentSpendings } from "@/actions/spending";

import { RecentSpendings } from "./recent-spendings";

export const RecentSpendingsContainerServer = async ({
  user,
}: {
  user: User;
}) => {
  const recentSpendings = await getUserRecentSpendings(user.id!);
  return <RecentSpendings recentSpendings={recentSpendings} />;
};
