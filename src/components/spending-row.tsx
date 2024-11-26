"use client";

import React from "react";

import { Spending } from "@/app/types/spending";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

const SpendingRow = ({
  spending,
  removeSpending,
  updateSpending,
}: {
  spending: Spending;
  removeSpending: (spendingId: string) => void;
  updateSpending: (spendingId: string, updatedSpending: Spending) => void;
}) => {
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

    debounceUpdate(() => {
      updateSpending(spending.id, {
        ...spending,
        description: newDescription,
        updatedAt: new Date().toISOString() as string,
      });
    }, 300);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmountValue(newAmount);

    debounceUpdate(() => {
      updateSpending(spending.id, {
        ...spending,
        amount: newAmount,
        updatedAt: new Date().toISOString() as string,
      });
    }, 300);
  };

  return (
    <TableRow key={spending.id}>
      <TableCell className="font-medium">
        <Input value={descriptionValue} onChange={handleDescriptionChange} />
      </TableCell>
      <TableCell>{spending.date}</TableCell>
      <TableCell className="text-right">
        <Input
          type="number"
          value={amountValue}
          onChange={handleAmountChange}
        />
      </TableCell>
      <TableCell>
        <Button onClick={() => removeSpending(spending.id)}>Remove</Button>
      </TableCell>
    </TableRow>
  );
};

export { SpendingRow };
