import { User } from "next-auth";

import { getUserSpendingsOnDate } from "@/actions/spending";

import { SpendingsContainerServerClient } from "./spendings-container-server-client";

export const SpendingsContainerServer = async ({ user }: { user: User }) => {
  const spendings = await getUserSpendingsOnDate(user.id!, new Date());
  return (
    <SpendingsContainerServerClient initialSpendings={spendings} user={user} />
  );
};
