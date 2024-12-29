import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TimePicker = ({
  time,
  onTimeChange,
  label,
}: {
  time: string;
  onTimeChange: (time: string) => void;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label}>{label}</Label>
      <Select
        defaultValue={time}
        onValueChange={(e: string) => onTimeChange(e)}
        name={label}
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
    </div>
  );
};
