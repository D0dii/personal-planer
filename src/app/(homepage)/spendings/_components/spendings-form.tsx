import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SpendingsForm = ({
  handleSubmit,
}: {
  handleSubmit: (formData: FormData) => Promise<void>;
}) => {
  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          required
          type="text"
          placeholder="Groceries"
          id="description"
          name="description"
          className="bg-white dark:bg-zinc-900"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          required
          type="number"
          step="0.01"
          placeholder="125"
          id="amount"
          name="amount"
          min={0}
          className="bg-white dark:bg-zinc-900"
        />
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};
