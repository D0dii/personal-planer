import React from "react";

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = React.useState<T>(defaultValue);
  React.useEffect(() => {
    const itemFromStorage = localStorage.getItem(key);
    if (itemFromStorage) {
      setValue(JSON.parse(itemFromStorage));
    } else {
      setValue(defaultValue);
    }
  }, [key, defaultValue]);
  const setNewValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return { value, setNewValue };
};

export { useLocalStorage };
