"use client";

import React from "react";

import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SpendingsTable } from "@/components/spendings-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { Spending } from "../types/spending";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const {
    value: spendings,
    setNewValue: setSpendings,
    isLoading,
  } = useLocalStorage<Spending[]>(
    date?.toDateString() as string,
    React.useMemo(() => [], []),
  );
  const handleDateChange = (date: Date | undefined) => {
    if (date === undefined) return;
    setDate(date);
  };
  const addSpending = (formData: FormData) => {
    const description = formData.get("description") as string;
    const amount = Number(formData.get("amount"));
    const newSpending = {
      id: crypto.randomUUID(),
      description,
      amount,
      date: date?.toDateString() as string,
      createdAt: new Date().toISOString() as string,
      updatedAt: new Date().toISOString() as string,
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
    <div className="flex w-full flex-col items-center pb-8 pt-8 md:px-16">
      <h1 className="mb-8 text-5xl">List of your todays spendings</h1>
      <div className="flex w-full flex-col justify-center md:flex-row">
        <div className="flex w-full flex-col items-center gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md bg-white dark:bg-zinc-900"
          />
          <form action={addSpending} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Description"
              name="description"
              className="bg-white dark:bg-zinc-900"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              name="amount"
              className="bg-white dark:bg-zinc-900"
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
        <div className="h-[70vh] w-full overflow-auto">
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
