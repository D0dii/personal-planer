import { Spending } from "@/app/types/spending";
import { SpendingRow } from "@/components/spending-row";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SpendingsTable = ({
  spendings,
  removeSpending,
  updateSpending,
}: {
  spendings: Spending[];
  removeSpending: (spendingId: string) => void;
  updateSpending: (spendingId: string, updatedSpending: Spending) => void;
}) => {
  return spendings.length === 0 ? (
    <Table className="rounded-lg bg-white dark:bg-zinc-900">
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
    <Table className="rounded-lg bg-white dark:bg-zinc-900">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spendings.map((spending) => (
          <SpendingRow
            key={spending.id}
            spending={spending}
            removeSpending={removeSpending}
            updateSpending={updateSpending}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="dark:bg-zinc-850 rounded-lg bg-slate-200 dark:bg-zinc-700">
          <TableCell colSpan={2} className="rounded-bl-lg">
            Total
          </TableCell>
          <TableCell className="text-right">
            ${spendings.reduce((prev, curr) => prev + curr.amount, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export { SpendingsTable };
