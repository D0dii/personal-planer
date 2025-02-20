import { useEffect, useState } from "react";

import { useDate } from "@/app/store/date-provider";
import { useSpendings } from "@/app/store/spendings-provider";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SpendingRow } from "./spending-row";
import { useSpendingsFormContext } from "./spending-wrappers";

export const SpendingsTable = () => {
  const date = useDate()((state) => state.date);
  const { getSpendings } = useSpendingsFormContext();
  const { spendings, setSpendings } = useSpendings()();
  const [isLoading, setIsLoading] = useState(true);

  const loadSpendings = async () => {
    const spendings = (await getSpendings()).filter(
      (spending) => spending.date.getDate() === date.getDate(),
    );
    setSpendings(spendings);
  };

  useEffect(() => {
    setIsLoading(true);
    loadSpendings();
    setIsLoading(false);
  }, [date]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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
