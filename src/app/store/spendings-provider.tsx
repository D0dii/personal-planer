"use client";

import { createContext, useContext, useState } from "react";
import { create } from "zustand";

import { Spending } from "@/types/spending";

interface StoreState {
  spendings: Spending[];
  setSpendings: (newSpendings: Spending[]) => void;
}

const createStore = (spendings: Spending[]) => {
  return create<StoreState>((set) => ({
    spendings,
    setSpendings: (newSpendings: Spending[]) => {
      set({ spendings: newSpendings });
    },
  }));
};

const SpendingsContext = createContext<ReturnType<typeof createStore> | null>(
  null,
);

export const useSpendings = () => {
  const store = useContext(SpendingsContext);
  if (!store)
    throw new Error("useSpendings must be used within a SpendingsProvider");
  return store;
};

export const SpendingsProvider = ({
  spendings,
  children,
}: {
  spendings: Spending[];
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(spendings));
  return (
    <SpendingsContext.Provider value={store}>
      {children}
    </SpendingsContext.Provider>
  );
};
