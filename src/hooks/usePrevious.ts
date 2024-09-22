import { useState } from "react";

export default function usePrevious<T>(value: T) {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T | null>(null);

  if (value !== current) {
    setCurrent(value);
    setPrevious(current);
  }

  return previous;
}
