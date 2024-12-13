import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TimePicker = ({
  time,
  onTimeChange,
  label,
}: {
  time: string;
  onTimeChange: (time: string) => void;
  label: string;
}) => {
  return (
    <>
      <Label htmlFor="event-end-time">{label}</Label>
      <Select
        defaultValue={time}
        onValueChange={(e: string) => onTimeChange(e)}
        name="event-end-time"
      >
        <SelectTrigger className="w-[120px] font-normal focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-[15rem]">
            {Array.from({ length: 96 }).map((_, i) => {
              const hour = Math.floor(i / 4)
                .toString()
                .padStart(2, "0");
              const minute = ((i % 4) * 15).toString().padStart(2, "0");
              return (
                <SelectItem key={i} value={`${hour}:${minute}`}>
                  {hour}:{minute}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>
    </>
  );
};

export { TimePicker };
