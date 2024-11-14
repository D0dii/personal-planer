"use client";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Spending } from "../types/spending";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SpendingItem } from "@/components/spending-item";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { value: spendings, setNewValue: setSpendings } = useLocalStorage<Spending[]>(
    date?.toDateString() as string,
    React.useMemo(() => [], [])
  );
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
  return (
    <main className="flex flex-col px-32 lg:px-80">
      <h1>Here is a list of your todays spendings:</h1>
      <h2>Today you have spent ${spendings.reduce((prev, curr) => prev + curr.amount, 0)}</h2>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      <div className="flex flex-col gap-2">
        {spendings?.map((spending) => (
          <SpendingItem key={spending.id} spending={spending} removeSpending={removeSpending} />
        ))}
      </div>
      <form action={addSpending}>
        <Input type="text" placeholder="Description" name="description" />
        <Input type="number" step="0.01" placeholder="Amount" name="amount" />
        <Button type="submit">Add</Button>
      </form>
    </main>
  );
}
