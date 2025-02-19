"use server";

import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/db";
import { newSpendingSchema } from "@/lib/zod";

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
  return spendings;
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
  return spending;
};

export const deleteSpending = async (spendingId: string) => {
  const client = prisma;
  const spending = await client.spending.delete({
    where: {
      id: spendingId,
    },
  });
  return spending;
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
  return spending;
};
