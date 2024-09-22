import { useState } from "react";

export default function useDefault<T>(initialValue: T, defaultValue: T) {
  const [state, setState] = useState(initialValue || defaultValue);

  const setStateWithDefault = (newVal: T) => {
    if (newVal === null || typeof newVal === "undefined") {
      setState(defaultValue);
    } else {
      setState(newVal);
    }
  };

  return [state, setStateWithDefault];
}
