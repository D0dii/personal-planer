import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { z } from "zod";

import {
  createSpending,
  deleteSpending,
  getUserSpendings,
  updateSpending,
} from "@/actions/spending";
import { newSpendingDataLayerSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

import {
  getValueFromLocalStorage,
  saveValueToLocalStorage,
} from "./useLocalStorage";

export const useSpendingData = (user: User | undefined) => {
  if (user && user.id) {
    const getSpendings = async () => {
      "use server";
      const userSpendings = await getUserSpendings(user.id!);
      return userSpendings as Spending[];
    };
    const addSpending = async (
      formData: z.infer<typeof newSpendingDataLayerSchema>,
    ) => {
      "use server";
      await createSpending({ ...formData, userId: user.id! });
    };
    const updateSpendings = async (
      spendingId: string,
      formData: z.infer<typeof newSpendingDataLayerSchema>,
    ) => {
      "use server";
      await updateSpending(spendingId, {
        ...formData,
        userId: user.id!,
      });
    };
    const removeSpending = async (spendingId: string) => {
      "use server";
      await deleteSpending(spendingId);
    };
    return {
      getSpendings,
      addSpending,
      updateSpendings,
      removeSpending,
    };
  } else {
    return {
      getSpendings: async () =>
        getValueFromLocalStorage<Spending[]>(
          "personal-planer-spendings",
          [],
        ) as Spending[],
      addSpending: async (
        formData: z.infer<typeof newSpendingDataLayerSchema>,
      ) => {
        const newSpending = {
          id: crypto.randomUUID(),
          ...formData,
          date: formData.date,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const newSpendings = getValueFromLocalStorage<Spending[]>(
          "personal-planer-spendings",
          [],
        );
        saveValueToLocalStorage("personal-planer-spendings", [
          ...newSpendings,
          newSpending,
        ]);
      },
      updateSpendings: async (
        spendingId: string,
        formData: z.infer<typeof newSpendingDataLayerSchema>,
      ) => {
        const updatedSpending = {
          id: spendingId,
          ...formData,
          date: formData.date,
          updatedAt: new Date(),
        };
        const newSpendings = getValueFromLocalStorage<Spending[]>(
          "personal-planer-spendings",
          [],
        );
        saveValueToLocalStorage("personal-planer-spendings", [
          ...newSpendings.map((prevSpending) =>
            prevSpending.id === spendingId
              ? { ...prevSpending, ...updatedSpending }
              : prevSpending,
          ),
        ]);
      },
      removeSpending: async (spendingId: string) => {
        const newSpendings = getValueFromLocalStorage<Spending[]>(
          "personal-planer-spendings",
          [],
        );
        saveValueToLocalStorage("personal-planer-spendings", [
          ...newSpendings.filter(
            (prevSpending) => prevSpending.id !== spendingId,
          ),
        ]);
      },
    };
  }
};
