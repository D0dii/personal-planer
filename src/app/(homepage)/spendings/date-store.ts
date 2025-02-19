import { create } from "zustand";

interface StoreState {
  date: Date;
  setDate: (newDate: Date | undefined) => void;
  isSpendingsActive: boolean;
  setIsSpendingsActive: (isActive: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  date: new Date(),
  setDate: (newDate: Date | undefined) => {
    if (newDate) {
      set({ date: newDate });
    }
  },
  isSpendingsActive: false,
  setIsSpendingsActive: (isActive: boolean) =>
    set({ isSpendingsActive: isActive }),
}));
