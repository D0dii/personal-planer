"use client";

import { createContext, useContext, useState } from "react";
import { create } from "zustand";

interface StoreState {
  date: Date;
  setDate: (newDate: Date | undefined) => void;
}

const createStore = (date: Date) => {
  return create<StoreState>((set) => ({
    date,
    setDate: (newDate: Date | undefined) => {
      if (newDate) {
        set({ date: newDate });
      }
    },
  }));
};

const DateContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useDate = () => {
  const store = useContext(DateContext);
  if (!store) throw new Error("useDate must be used within a DateProvider");
  return store;
};

export const DateProvider = ({
  date,
  children,
}: {
  date: Date;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createStore(date));
  return <DateContext.Provider value={store}>{children}</DateContext.Provider>;
};
