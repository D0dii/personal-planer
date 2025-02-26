"use server";

import { z } from "zod";

import prisma from "@/lib/db";
import { newSpendingSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

export const getUserSpendings = async (userId: string) => {
  const client = prisma;
  const spendings = await client.spending.findMany({
    where: {
      userId,
    },
  });
  return spendings;
};

export const getUserSpendingsOnDate = async (userId: string, date: Date) => {
  const client = prisma;
  const spendings = await client.spending.findMany({
    where: {
      userId,
      date: {
        gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      },
    },
  });
  return spendings satisfies Spending[];
};

export const createSpending = async (
  formData: z.infer<typeof newSpendingSchema>,
) => {
  const client = prisma;
  const { description, amount, date, userId } = formData;
  const spending = await client.spending.create({
    data: {
      description,
      amount,
      date,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return spending satisfies Spending;
};

export const deleteSpending = async (spendingId: string) => {
  const client = prisma;
  const isSpending = await client.spending.findUnique({
    where: {
      id: spendingId,
    },
  });
  if (!isSpending) {
    return null;
  }
  const spending = await client.spending.delete({
    where: {
      id: spendingId,
    },
  });
  return spending satisfies Spending;
};

export const updateSpending = async (
  spendingId: string,
  formData: z.infer<typeof newSpendingSchema>,
) => {
  const client = prisma;
  const spending = await client.spending.update({
    where: {
      id: spendingId,
    },
    data: {
      ...formData,
    },
  });
  return spending satisfies Spending;
};
