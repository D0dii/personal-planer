"use client";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Spending } from "../types/spending";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SpendingsTable } from "@/components/spendings-table";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { value: spendings, setNewValue: setSpendings } = useLocalStorage<Spending[]>(
    date?.toDateString() as string,
    React.useMemo(() => [], [])
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
    } satisfies Spending;
    setSpendings([...spendings, newSpending]);
  };
  const removeSpending = (spendingId: string) => {
    const newSpendings = spendings?.filter((prevSpending) => prevSpending.id !== spendingId);
    setSpendings(newSpendings);
  };
  const updateSpending = (spendingId: string, updatedSpending: Spending) => {
    const newSpendings = spendings?.map((prevSpending) =>
      prevSpending.id === spendingId ? updatedSpending : prevSpending
    );
    setSpendings(newSpendings);
  };
  return (
    <main className="flex flex-col items-center mt-8">
      <h1 className="text-5xl mb-8">List of your todays spendings</h1>
      <div className="flex justify-center gap-28 w-full">
        <div className="flex flex-col gap-8">
          <Calendar mode="single" selected={date} onSelect={handleDateChange} className="rounded-md border" />
          <form action={addSpending} className="flex flex-col gap-4">
            <Input type="text" placeholder="Description" name="description" />
            <Input type="number" step="0.01" placeholder="Amount" name="amount" />
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
