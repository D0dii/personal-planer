"use client";

import React from "react";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { newSpendingSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

import { SpendingsTable } from "./_components/spendings-table";

export default function SpendingsPage() {
  const [date, setDate] = React.useState<Date>(new Date());
  const {
    value: spendings,
    setNewValue: setSpendings,
    isLoading,
  } = useLocalStorage<Spending[]>(
    date.toDateString(),
    React.useMemo(() => [], []),
  );
  const handleDateChange = (date: Date | undefined) => {
    if (date === undefined) return;
    setDate(date);
  };
  const addSpending = (formData: FormData) => {
    const validation = newSpendingSchema.safeParse({
      description: formData.get("description"),
      amount: formData.get("amount"),
    });
    if (!validation.success) {
      return;
    }
    const { description, amount } = validation.data;
    const newSpending = {
      id: crypto.randomUUID(),
      description,
      amount,
      date: date.toDateString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } satisfies Spending;
    setSpendings([...spendings, newSpending]);
  };
  const removeSpending = (spendingId: string) => {
    const newSpendings = spendings?.filter(
      (prevSpending) => prevSpending.id !== spendingId,
    );
    setSpendings(newSpendings);
  };
  const updateSpending = (spendingId: string, updatedSpending: Spending) => {
    const newSpendings = spendings?.map((prevSpending) =>
      prevSpending.id === spendingId ? updatedSpending : prevSpending,
    );
    setSpendings(newSpendings);
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
          <form action={addSpending} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                required
                type="text"
                placeholder="Groceries"
                id="description"
                name="description"
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                required
                type="number"
                step="0.01"
                placeholder="125"
                id="amount"
                name="amount"
                min={0}
                className="bg-white dark:bg-zinc-900"
              />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </div>
        <div className="mt-6 w-full overflow-auto px-8 md:h-[70vh] lg:mt-0 lg:px-0">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <SpendingsTable
              spendings={spendings}
              removeSpending={removeSpending}
              updateSpending={updateSpending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
