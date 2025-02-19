import { useEffect, useState } from "react";
import { z } from "zod";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { newSpendingDataLayerSchema } from "@/lib/zod";
import { Spending } from "@/types/spending";

import { useStore } from "../date-store";
import { SpendingRow } from "./spending-row";
import { useSpendingsFormContext } from "./spending-wrappers";

export const SpendingsTable = () => {
  const { date, isSpendingsActive, setIsSpendingsActive } = useStore();
  const { getSpendings } = useSpendingsFormContext();
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const loadSpendings = async () => {
    const spendings = await getSpendings(date);
    setSpendings(spendings);
    setIsSpendingsActive(true);
  };
  useEffect(() => {
    loadSpendings();
  }, [date, isSpendingsActive]);
  return spendings.length === 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-14 text-center text-xl">
            {"You haven't spent anything today"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spendings.map((spending) => (
          <SpendingRow key={spending.id} spending={spending} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="dark:bg-zinc-850 rounded-lg bg-slate-200 dark:bg-zinc-700">
          <TableCell colSpan={2} className="rounded-bl-lg">
            Total
          </TableCell>
          <TableCell className="text-right">
            $
            {spendings.reduce((prev, curr) => prev + curr.amount, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
