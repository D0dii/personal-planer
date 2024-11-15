import { Spending } from "@/app/types/spending";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";

const SpendingsTable = ({
  spendings,
  removeSpending,
}: {
  spendings: Spending[];
  removeSpending: (spendingId: string) => void;
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
          <TableRow key={spending.id}>
            <TableCell className="font-medium">{spending.description}</TableCell>
            <TableCell>{spending.date}</TableCell>
            <TableCell className="text-right">{spending.amount}</TableCell>
            <TableCell>
              <Button onClick={() => removeSpending(spending.id)}>Remove</Button>
            </TableCell>
          </TableRow>
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
