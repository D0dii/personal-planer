"use client";

import React from "react";

import { useSpendings } from "@/app/store/spendings-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Spending } from "@/types/spending";

import { useSpendingsFormContext } from "./spending-wrappers";

export const SpendingRow = ({ spending }: { spending: Spending }) => {
  const { spendings, setSpendings } = useSpendings()();
  const { modifySpending, removeSpending } = useSpendingsFormContext();
  const [descriptionValue, setDescriptionValue] = React.useState(
    spending.description,
  );
  const [amountValue, setAmountValue] = React.useState(spending.amount);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounceUpdate = (callback: () => void, delay: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, delay);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescriptionValue(newDescription);

    debounceUpdate(async () => {
      const newSpending = await modifySpending(spending.id, {
        amount: spending.amount,
        description: newDescription,
        date: spending.date,
      });
      setSpendings(
        spendings.map((spending) =>
          spending.id === newSpending.id ? newSpending : spending,
        ),
      );
    }, 300);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmountValue(newAmount);

    debounceUpdate(async () => {
      const newSpending = await modifySpending(spending.id, {
        description: spending.description,
        amount: newAmount,
        date: spending.date,
      });
      setSpendings(
        spendings.map((spending) =>
          spending.id === newSpending.id ? newSpending : spending,
        ),
      );
    }, 300);
  };

  return (
    <TableRow key={spending.id}>
      <TableCell className="font-medium">
        <Input value={descriptionValue} onChange={handleDescriptionChange} />
      </TableCell>
      <TableCell>{spending.date.toDateString()}</TableCell>
      <TableCell className="text-right">
        <Input
          type="number"
          value={amountValue}
          onChange={handleAmountChange}
        />
      </TableCell>
      <TableCell>
        <Button
          onClick={async () => {
            const deletedSpending = await removeSpending(spending.id);
            if (!deletedSpending) return;
            setSpendings(
              spendings.filter(
                (spending) => spending.id !== deletedSpending.id,
              ),
            );
          }}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};
