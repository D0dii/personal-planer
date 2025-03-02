import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/event";

export const UpcomingEvents = ({
  upcomingEvents,
}: {
  upcomingEvents: Event[];
}) => {
  return upcomingEvents.length === 0 ? (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Upcoming events</h2>
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
              {"You don't have any upcoming events"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-3xl">Upcoming events</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingEvents.map((event) => (
            <TableRow key={event.id} className="border-0">
              <TableCell>{event.title}</TableCell>
              <TableCell>
                {event.start.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
