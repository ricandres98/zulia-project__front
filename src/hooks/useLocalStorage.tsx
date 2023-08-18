import React, { useEffect } from "react";

const useLocalStorage = (itemName: string, initialValue: unknown) => {
  const [item, setItem] = React.useState(initialValue);

  useEffect(() => {
    const itemValue = localStorage.getItem(itemName);

    if (itemValue) {
      setItem(JSON.parse(itemValue));
    } else {
      localStorage.setItem(itemName, JSON.stringify(initialValue));
    }
  }, []);

  const saveItem = (value: any) => {
    setItem(value);
    localStorage.setItem(itemName, JSON.stringify(value));
  };

  return { item, saveItem };
};

export { useLocalStorage };
