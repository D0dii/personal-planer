"use server";

import { revalidatePath } from "next/cache";
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

export const getUserRecentSpendings = async (userId: string) => {
  const client = prisma;
  const spendings = await client.spending.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return spendings satisfies Spending[];
};

export const getUserMonthlySpendingsAmount = async (userId: string) => {
  const client = prisma;
  const date = new Date();
  const spendings = await client.spending.findMany({
    where: {
      userId,
      date: {
        gte: new Date(date.getFullYear(), date.getMonth(), 1),
        lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      },
    },
  });
  return spendings.reduce((sum, spending) => sum + spending.amount, 0);
};

export const getUserLastWeekSpendings = async (userId: string) => {
  const client = prisma;
  const date = new Date();
  const spendings = await client.spending.groupBy({
    by: ["date"],
    _sum: {
      amount: true,
    },
    where: {
      userId,
      date: {
        gte: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7),
        lt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return spendings.map((spending) => ({
    ...spending,
    amount: spending._sum.amount,
  }));
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
  revalidatePath("/");
  revalidatePath("/spendings");
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
  revalidatePath("/");
  revalidatePath("/spendings");
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
  revalidatePath("/");
  revalidatePath("/spendings");
  return spending satisfies Spending;
};
