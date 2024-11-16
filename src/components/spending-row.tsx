"use client";
import { Spending } from "@/app/types/spending";
import { Input } from "./ui/input";
import { TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import React from "react";

const SpendingRow = ({
  spending,
  removeSpending,
  updateSpending,
}: {
  spending: Spending;
  removeSpending: (spendingId: string) => void;
  updateSpending: (spendingId: string, updatedSpending: Spending) => void;
}) => {
  const [descriptionValue, setDescriptionValue] = React.useState(spending.description);
  const [amountValue, setAmountValue] = React.useState(spending.amount);
  const [timer, setTimer] = React.useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const descriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      updateSpending(spending.id, { ...spending, description: e.target.value });
    }, 500);

    setTimer(newTimer);
  };

  const amountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(Number(e.target.value));

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      updateSpending(spending.id, { ...spending, amount: Number(e.target.value) });
    }, 500);

    setTimer(newTimer);
  };

  return (
    <TableRow key={spending.id}>
      <TableCell className="font-medium">
        <Input value={descriptionValue} onChange={descriptionChanged} />
      </TableCell>
      <TableCell>{spending.date}</TableCell>
      <TableCell className="text-right">
        <Input type="number" value={amountValue} onChange={amountChanged} />
      </TableCell>
      <TableCell>
        <Button onClick={() => removeSpending(spending.id)}>Remove</Button>
      </TableCell>
    </TableRow>
  );
};

export { SpendingRow };
