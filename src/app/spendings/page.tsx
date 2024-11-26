"use client";

import React from "react";

import { SpendingsTable } from "@/components/spendings-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { Spending } from "../types/spending";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { value: spendings, setNewValue: setSpendings } = useLocalStorage<
    Spending[]
  >(
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
    <main className="mt-8 flex flex-col items-center">
      <h1 className="mb-8 text-5xl">List of your todays spendings</h1>
      <div className="flex w-full justify-center gap-28">
        <div className="flex flex-col gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md border"
          />
          <form action={addSpending} className="flex flex-col gap-4">
            <Input type="text" placeholder="Description" name="description" />
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              name="amount"
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
        <div className="h-[70vh] overflow-auto">
          <SpendingsTable
            spendings={spendings}
            removeSpending={removeSpending}
            updateSpending={updateSpending}
          />
        </div>
      </div>
    </main>
  );
}
