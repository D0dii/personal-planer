"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Spending } from "@/types/spending";

export const SpendingRow = ({
  spending,
  handleDeleteSpending,
  handleSpendingUpdate,
}: {
  spending: Spending;
  handleDeleteSpending: (spendingId: string) => void;
  handleSpendingUpdate: (
    spendingId: string,
    data: {
      description: string;
      amount: number;
    },
  ) => void;
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

    debounceUpdate(async () => {
      handleSpendingUpdate(spending.id, {
        description: newDescription,
        amount: amountValue,
      });
    }, 300);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmountValue(newAmount);

    debounceUpdate(async () => {
      handleSpendingUpdate(spending.id, {
        description: descriptionValue,
        amount: newAmount,
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
        <Button
          onClick={async () => {
            await handleDeleteSpending(spending.id);
          }}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};
