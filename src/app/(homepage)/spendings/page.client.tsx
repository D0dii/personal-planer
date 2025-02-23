"use client";

import React, { useEffect, useState } from "react";

import { useDate } from "@/app/store/date-provider";
import { Calendar } from "@/components/ui/calendar";
import { Spending } from "@/types/spending";

import { useSpendingsFormContext } from "./_components/spending-wrappers";
import { SpendingsForm } from "./_components/spendings-form";
import { SpendingsTable } from "./_components/spendings-table";

//local storage container i server container i one defiiuja funkcje i przekazuja w propsach
// wydzielenie spendings i date do tego komponentu i przekazywanie w propsach
export const SpendingsClient = () => {
  const { date, setDate } = useDate()();
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const [datee, setDatee] = useState(new Date());
  const { getSpendings } = useSpendingsFormContext();

  useEffect(() => {
    loadSpendings();
  }, []);
  const loadSpendings = async () => {
    const spendings = (await getSpendings()).filter(
      (spending) => spending.date.getDate() === date.getDate(),
    );
    setSpendings(spendings);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
    }
    loadSpendings();
  };

  return (
    <div className="flex w-full flex-col items-center py-6 md:px-12">
      <h1 className="mb-8 text-5xl">List of your todays spendings</h1>
      <div className="flex w-full flex-col justify-center lg:flex-row">
        <div className="flex w-full flex-col items-center gap-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md bg-white dark:bg-zinc-900"
          />
          <SpendingsForm />
        </div>
        <div className="mt-6 w-full overflow-auto px-8 md:h-[70vh] lg:mt-0 lg:px-0">
          <SpendingsTable />
        </div>
      </div>
    </div>
  );
};
