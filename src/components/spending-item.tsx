import { Spending } from "@/app/types/spending";
import { Button } from "@/components/ui/button";

const SpendingItem = ({
  spending,
  removeSpending,
}: {
  spending: Spending;
  removeSpending: (id: string) => void;
}) => {
  return (
    <div>
      <p>{spending.description}</p>
      <p>{spending.amount}</p>
      <Button onClick={() => removeSpending(spending.id)}>Remove</Button>
    </div>
  );
};

export { SpendingItem };
