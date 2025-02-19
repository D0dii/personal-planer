import React from "react";

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

export const getValueFromLocalStorage = <T,>(key: string, defaultValue: T) => {
  const itemFromStorage = localStorage.getItem(key);
  const newObjs: T[] = [];
  if (itemFromStorage) {
    for (const obj of JSON.parse(itemFromStorage)) {
      newObjs.push(deserializeObject(obj));
    }
    // console.log(JSON.parse(itemFromStorage));
    // console.log(newObjs);
    return new Promise((resolve) => resolve(newObjs));
  } else {
    return defaultValue;
  }
};

export const saveValueToLocalStorage = <T,>(key: string, value: T) => {
  const newObjs = [];
  for (const obj of value) {
    newObjs.push(serializeObject(obj));
  }
  localStorage.setItem(key, JSON.stringify(newObjs));
};

const serializeObject = (obj: object) => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      newObj[key] = value.toString();
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
};

const deserializeObject = (obj: object) => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string" && value.includes("GMT")) {
      newObj[key] = new Date(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
};
