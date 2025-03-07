import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const LoadingSkeleton = () => {
  return (
    <Table className="rounded-lg bg-white dark:bg-zinc-900">
      <TableHeader>
        <TableRow className="border-slate-300 dark:border-gray-800">
          <TableHead>
            <Skeleton className="h-4" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index} className="border-0">
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
