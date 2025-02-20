import { useDate } from "@/app/store/date-provider";
import { useSpendings } from "@/app/store/spendings-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newSpendingFormSchema } from "@/lib/zod";

import { useSpendingsFormContext } from "./spending-wrappers";

export const SpendingsForm = () => {
  const date = useDate()((state) => state.date);
  const { setSpendings, spendings } = useSpendings()();
  const { addSpending } = useSpendingsFormContext();
  const handleSubmit = async (formData: FormData) => {
    const validation = newSpendingFormSchema.safeParse({
      description: formData.get("description"),
      amount: formData.get("amount"),
    });
    if (!validation.success) {
      return alert(validation.error.message);
    }
    const newSpending = await addSpending({ ...validation.data, date });
    setSpendings([...spendings, newSpending]);
  };
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
