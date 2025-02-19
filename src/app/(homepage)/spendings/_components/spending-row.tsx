"use client";

import React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { newSpendingDataLayerSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

export const SpendingRow = ({ spending }: { spending: Spending }) => {
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

  const updateSpending = async (
    spendingId: string,
    formData: z.infer<typeof newSpendingDataLayerSchema>,
  ) => {
    console.log("updateSpending", spendingId, formData);
  };
  const removeSpending = async (spendingId: string) => {
    console.log("deleteSpending", spendingId);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescriptionValue(newDescription);

    debounceUpdate(() => {
      updateSpending(spending.id, {
        amount: spending.amount,
        description: newDescription,
        date: spending.date,
      });
    }, 300);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmountValue(newAmount);

    debounceUpdate(() => {
      updateSpending(spending.id, {
        description: spending.description,
        amount: newAmount,
        date: spending.date,
      });
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
        <Button onClick={async () => await removeSpending(spending.id)}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};
