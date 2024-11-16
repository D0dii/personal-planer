import { Spending } from "@/app/types/spending";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { SpendingRow } from "./spending-row";

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
