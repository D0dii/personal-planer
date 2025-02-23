"use client";

import { User } from "next-auth";
import { useState } from "react";

import {
  createSpending,
  deleteSpending,
  getUserSpendingsOnDate,
  updateSpending,
} from "@/actions/spending";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Calendar } from "@/components/ui/calendar";
import { newSpendingFormSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

import { SpendingsForm } from "./spendings-form";
import { SpendingsTable } from "./spendings-table";

export const SpendingsContainerServerClient = ({
  initialSpendings,
  user,
}: {
  initialSpendings: Spending[];
  user: User;
}) => {
  const [spendings, setSpendings] = useState(initialSpendings);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const loadSpendings = async (date: Date) => {
    const spendings = await getUserSpendingsOnDate(user.id!, date);
    setSpendings(spendings);
  };
  const handleDateChange = async (date: Date | undefined) => {
    if (date) {
      setIsLoading(true);
      await loadSpendings(date);
      setIsLoading(false);
      setDate(date);
    }
  };
  const handleFormSubmit = async (formData: FormData) => {
    const validation = newSpendingFormSchema
      .pick({
        description: true,
        amount: true,
      })
      .safeParse({
        description: formData.get("description"),
        amount: formData.get("amount"),
      });
    if (!validation.success) {
      return alert(validation.error.message);
    }
    const newSpending = await createSpending({
      ...validation.data,
      date,
      userId: user.id!,
    });
    setSpendings([...spendings, newSpending]);
  };
  const handleDeleteSpending = async (spendingId: string) => {
    await deleteSpending(spendingId);
    const updatedSpendings = spendings.filter(
      (spending) => spending.id !== spendingId,
    );
    setSpendings(updatedSpendings);
  };
  const handleSpendingUpdate = async (
    spendingId: string,
    data: {
      description: string;
      amount: number;
    },
  ) => {
    const updatedSpending = await updateSpending(spendingId, {
      ...data,
      date,
      userId: user.id!,
    });
    setSpendings(
      spendings.map((spending) =>
        spending.id === spendingId ? updatedSpending : spending,
      ),
    );
  };
  return (
    <div className="flex w-full flex-col items-center py-6 md:px-12">
      <h1 className="mb-8 text-5xl">List of your todays spendings</h1>
      <div className="flex w-full flex-col justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md bg-white dark:bg-zinc-900"
          />
          <SpendingsForm handleSubmit={handleFormSubmit} />
        </div>
        <div className="mt-6 w-full overflow-auto px-8 md:h-[70vh] lg:mt-0 lg:px-0">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <SpendingsTable
              spendings={spendings}
              handleDeleteSpending={handleDeleteSpending}
              handleSpendingUpdate={handleSpendingUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
