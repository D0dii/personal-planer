"use client";

import { Spending as PrismaSpending } from "@prisma/client";
import { User } from "next-auth";
import { createContext, useContext } from "react";
import { z } from "zod";

import {
  createSpending,
  deleteSpending,
  getUserSpendings,
  updateSpending,
} from "@/actions/spending";
import {
  createSpendingToLocalStorage,
  getSpendingsFromLocalStorage,
  modifySpendingInLocalStorage,
  removeSpendingFromLocalStorage,
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
// schema na podstawie typu sprobowac
const SpendingsFormContext = createContext<{
  getSpendings: () => Promise<Spending[] | PrismaSpending[]>;
  addSpending: (
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => Promise<Spending | PrismaSpending>;
  modifySpending: (
    spendingId: string,
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => Promise<Spending | PrismaSpending>;
  removeSpending: (
    spendingId: string,
  ) => Promise<Spending | PrismaSpending | null>;
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
  const getSpendings = async () => {
    const userSpendings = await getUserSpendings(user.id!);
    return userSpendings;
  };
  const addSpending = async (
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    return await createSpending({ ...formData, userId: user.id! });
  };
  const modifySpending = async (
    spendingId: string,
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    return await updateSpending(spendingId, {
      ...formData,
      userId: user.id!,
    });
  };
  const removeSpending = async (spendingId: string) => {
    return await deleteSpending(spendingId);
  };
  const value = {
    getSpendings,
    addSpending,
    modifySpending,
    removeSpending,
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
  const getSpendings = async () => {
    const spendings = (await getSpendingsFromLocalStorage()) as Spending[];
    return spendings;
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
    return await createSpendingToLocalStorage(newSpending);
  };
  const modifySpending = async (
    spendingId: string,
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    const updatedSpending = {
      id: spendingId,
      ...formData,
      date: formData.date,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    return await modifySpendingInLocalStorage(spendingId, updatedSpending);
  };
  const removeSpending = async (spendingId: string) => {
    return await removeSpendingFromLocalStorage(spendingId);
  };
  const value = {
    getSpendings,
    addSpending,
    modifySpending,
    removeSpending,
  };
  return (
    <SpendingsFormContext.Provider value={value}>
      {children}
    </SpendingsFormContext.Provider>
  );
};
