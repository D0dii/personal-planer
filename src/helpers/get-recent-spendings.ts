import { Spending } from "@/types/spending";

export const getRecentExpenses = () => {
  const today = new Date();
  let allExpenses: Spending[] = [];

  for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateString = date.toDateString();
    const spendings = JSON.parse(
      localStorage.getItem(dateString) || "[]",
    ) as Spending[];
    allExpenses = [...allExpenses, ...spendings];
  }
  return allExpenses
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
};
