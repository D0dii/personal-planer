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
  return (
    <Table>
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
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            ${spendings.reduce((prev, curr) => prev + curr.amount, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export { SpendingsTable };
