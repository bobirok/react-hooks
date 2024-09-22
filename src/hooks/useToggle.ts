import { useState } from "react";

export default function useToggle(initialValue: boolean) {
  const [on, setOn] = useState(!!initialValue);

  const toggle = (value: boolean) => {
    if (value === null || typeof value === "undefined") {
      setOn(!on);
    }
    if (value === on) {
      return [on, toggle];
    }
    if (typeof value === "boolean") {
      setOn(value);
    }
    if (typeof value !== "boolean") {
      setOn(!on);
    }
  };

  return [on, toggle];
}
