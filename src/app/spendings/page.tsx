"use client";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { Spending } from "../types/spending";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [spendings, setSpendings] = React.useState<Spending[]>([]);
  const addSpending = (formData: FormData) => {
    const description = formData.get("description") as string;
    const amount = Number(formData.get("amount"));
    const newSpending = {
      description,
      amount,
      date: date?.toDateString() as string,
    } satisfies Spending;
    setSpendings((prevSpendings) => [...prevSpendings, newSpending]);
    localStorage.setItem(date?.toDateString() as string, JSON.stringify([...spendings, newSpending]));
  };
  React.useEffect(() => {
    if (date) {
      setSpendings(JSON.parse(localStorage.getItem(date?.toDateString()) as string) ?? []);
    } else {
      setSpendings([]);
    }
  }, [date]);
  return (
    <main className="flex flex-col">
      <h1>Here is a list of your todays spendings:</h1>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      <ul>
        {spendings?.map((spending) => (
          <li key={spending.description}>
            <p>{spending.description}</p>
            <p>{spending.amount}</p>
          </li>
        ))}
      </ul>
      <form action={addSpending}>
        <Input type="text" placeholder="Description" name="description" />
        <Input type="number" placeholder="Amount" name="amount" />
        <Button type="submit">Add</Button>
      </form>
    </main>
  );
}
