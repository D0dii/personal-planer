import React from "react";

const DATE_KEYS = ["createdAt", "updatedAt", "date"];

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = React.useState<T>(defaultValue);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const itemFromStorage = localStorage.getItem(key);
    if (itemFromStorage) {
      const parsedItemFromStorage = JSON.parse(itemFromStorage);
      const newItems: any = [];
      for (const item of parsedItemFromStorage) {
        const newItem = { ...item };
        for (let key in newItem) {
          if (DATE_KEYS.includes(key)) {
            newItem[key] = new Date(newItem[key]);
          }
        }
        newItems.push(newItem);
      }
      setValue(newItems);
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
