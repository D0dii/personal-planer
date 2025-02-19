"use client";

import { User } from "next-auth";
import { createContext, useContext } from "react";
import { z } from "zod";

import {
  createSpending,
  getUserSpendings,
  getUserSpendingsOnDate,
} from "@/actions/spending";
import {
  getValueFromLocalStorage,
  saveValueToLocalStorage,
} from "@/hooks/useLocalStorage";
import { newSpendingDataLayerSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

export const SpendingsFormWrapper = ({
  user,
  children,
}: {
  user: User | undefined;
  children: React.ReactNode;
}) => {
  if (user) {
    return (
      <AuthSpendingsFormWrapper user={user}>
        {children}
      </AuthSpendingsFormWrapper>
    );
  }
  return <NonAuthSpendingsFormWrapper>{children}</NonAuthSpendingsFormWrapper>;
};

const SpendingsFormContext = createContext<{
  getSpendings: (date: Date) => Promise<Spending[]>;
  addSpending: (
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => Promise<void>;
} | null>(null);

export const useSpendingsFormContext = () => {
  const context = useContext(SpendingsFormContext);
  if (!context) {
    throw new Error(
      "useSpendingsFormContext must be used within a <SpendingsFormWrapper />",
    );
  }
  return context;
};

const AuthSpendingsFormWrapper = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  const getSpendings = async (date: Date) => {
    const userSpendings = await getUserSpendingsOnDate(user.id!, date);
    return userSpendings;
  };
  const addSpending = async (
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    await createSpending({ ...formData, userId: user.id! });
  };
  const value = {
    getSpendings,
    addSpending,
  };
  return (
    <SpendingsFormContext.Provider value={value}>
      {children}
    </SpendingsFormContext.Provider>
  );
};

const NonAuthSpendingsFormWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getSpendings = async (date: Date) => {
    const spendings = (await getValueFromLocalStorage<Spending[]>(
      "personal-planer-spendings",
      [],
    )) as Spending[];
    return spendings.filter(
      (spending) => spending.date.getDate() === date.getDate(),
    );
  };
  const addSpending = async (
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    const newSpending = {
      id: crypto.randomUUID(),
      ...formData,
      date: formData.date,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newSpendings = await getValueFromLocalStorage<Spending[]>(
      "personal-planer-spendings",
      [],
    );
    saveValueToLocalStorage("personal-planer-spendings", [
      ...newSpendings,
      newSpending,
    ]);
  };
  const value = {
    getSpendings,
    addSpending,
  };
  return (
    <SpendingsFormContext.Provider value={value}>
      {children}
    </SpendingsFormContext.Provider>
  );
};
