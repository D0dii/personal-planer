import { Spending } from "@/app/types/spending";
import { SpendingDay } from "@/app/types/spending-day";

const getLastWeekExpenses = () => {
  const today = new Date();
  const totalExpenses: SpendingDay[] = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    totalExpenses.push({
      date: date.getDate(),
      amount: spendings.reduce((sum, spending) => sum + spending.amount, 0),
    });
  }

  return totalExpenses;
};

export { getLastWeekExpenses };
