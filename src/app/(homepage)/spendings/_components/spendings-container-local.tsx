"use client";

import { useState } from "react";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Calendar } from "@/components/ui/calendar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { newSpendingSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

import { SpendingsForm } from "./spendings-form";
import { SpendingsTable } from "./spendings-table";

export const SpendingsContainerLocal = () => {
  const {
    value: spendings,
    setNewValue: setSpendings,
    isLoading,
  } = useLocalStorage<Spending[]>("personal-planer-spendings", []);
  const [date, setDate] = useState(new Date());
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
  };
  const handleFormSubmit = async (formData: FormData) => {
    const validation = newSpendingSchema
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
    const newSpending = {
      id: crypto.randomUUID(),
      ...validation.data,
      date,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSpendings([...spendings, newSpending]);
  };
  const handleDeleteSpending = async (id: string) => {
    setSpendings(spendings.filter((spending) => spending.id !== id));
  };
  const handleSpendingUpdate = async (
    id: string,
    data: { description: string; amount: number },
  ) => {
    setSpendings(
      spendings.map((spending) =>
        spending.id === id
          ? { ...spending, ...data, updatedAt: new Date() }
          : spending,
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
              spendings={spendings.filter(
                (spending) => spending.date.getDate() === date.getDate(),
              )}
              handleDeleteSpending={handleDeleteSpending}
              handleSpendingUpdate={handleSpendingUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
