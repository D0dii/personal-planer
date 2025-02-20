import React from "react";

import { Spending } from "@/types/spending";

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = React.useState<T>(defaultValue);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const itemFromStorage = localStorage.getItem(key);
    if (itemFromStorage) {
      setValue(JSON.parse(itemFromStorage));
    } else {
      setValue(defaultValue);
    }
    setIsLoading(false);
  }, [key]);
  const setNewValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return { value, setNewValue, isLoading };
};

export const getSpendingsFromLocalStorage = (): Spending[] => {
  const spendings = JSON.parse(
    localStorage.getItem("personal-planer-spendings") ?? "",
  );
  if (!spendings) return [];
  const deserializedSpendings = deserializeSpendings(spendings);
  return deserializedSpendings;
};

export const createSpendingToLocalStorage = (spending: Spending) => {
  let deserializedSpendings: Spending[] = [];
  const spendings = JSON.parse(
    localStorage.getItem("personal-planer-spendings") ?? "",
  );
  if (spendings) {
    deserializedSpendings = deserializeSpendings(spendings);
  }
  deserializedSpendings.push(spending);
  const newSpendings = serializeSpendings(deserializedSpendings);
  localStorage.setItem(
    "personal-planer-spendings",
    JSON.stringify(newSpendings),
  );
  return spending;
};

export const modifySpendingInLocalStorage = (
  spendingId: string,
  spending: Spending,
) => {
  let deserializedSpendings: Spending[] = [];
  const spendings = JSON.parse(
    localStorage.getItem("personal-planer-spendings") ?? "",
  );
  if (spendings) {
    deserializedSpendings = deserializeSpendings(spendings);
  }
  const newSpendings = deserializedSpendings.map((prevSpending) =>
    prevSpending.id === spendingId ? spending : prevSpending,
  );
  localStorage.setItem(
    "personal-planer-spendings",
    JSON.stringify(serializeSpendings(newSpendings)),
  );
  return spending;
};

export const removeSpendingFromLocalStorage = (spendingId: string) => {
  const spendings = JSON.parse(
    localStorage.getItem("personal-planer-spendings") ?? "",
  );
  if (!spendings) {
    return null;
  }
  const deserializedSpendings = deserializeSpendings(spendings) as Spending[];
  const spending = deserializedSpendings.find(
    (spending) => spending.id === spendingId,
  );
  if (!spending) {
    return null;
  }
  const newSpendings = deserializedSpendings.filter(
    (spending) => spending.id !== spendingId,
  );
  localStorage.setItem(
    "personal-planer-spendings",
    JSON.stringify(serializeSpendings(newSpendings)),
  );
  return spending;
};

const serializeSpendings = (spendings: Spending[]) => {
  const serializedSpendings = JSON.stringify(
    spendings.map((spending) => ({
      ...spending,
      date: spending.date.toString(),
    })),
  );
  return serializedSpendings;
};

const deserializeSpendings = (serializedSpendings: string) => {
  const desarializedSpendings = JSON.parse(serializedSpendings);
  const spendings: Spending[] = [];
  for (const spending of desarializedSpendings) {
    spendings.push({
      ...spending,
      date: new Date(spending.date),
    });
  }
  return spendings;
};
