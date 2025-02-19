"use client";

import React from "react";

import { Calendar } from "@/components/ui/calendar";

import { SpendingsForm } from "./_components/spendings-form";
import { SpendingsTable } from "./_components/spendings-table";
import { useStore } from "./date-store";

export const SpendingsClient = () => {
  const { date, setDate } = useStore();
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
