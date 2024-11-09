import React from "react";

const useLocalStorage = <T,>(key: string) => {
  const [value, setValue] = React.useState<T>(
    Array.isArray([] as T) ? ([] as unknown as T) : ("" as unknown as T)
  );
  React.useEffect(() => {
    const itemFromStorage = localStorage.getItem(key);
    if (itemFromStorage) {
      setValue(JSON.parse(itemFromStorage));
    } else {
      setValue(Array.isArray([] as T) ? ([] as T) : ("" as T));
    }
  }, [key]);
  const setNewValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return { value, setNewValue };
};

export { useLocalStorage };
