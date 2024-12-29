import { Expense } from "@/types/expense";
import { Spending } from "@/types/spending";

export const calcuateDailyExpensesFromMonth = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalExpenses: Expense[] = [];

  for (let i = 1; i <= 31; i++) {
    const date = new Date(currentYear, currentMonth, i);
    if (date.getMonth() !== currentMonth) break;

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    totalExpenses.push({
      date,
      amount: spendings.reduce((sum, spending) => sum + spending.amount, 0),
    });
  }

  return totalExpenses;
};
