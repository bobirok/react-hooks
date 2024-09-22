import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, interval = 500) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastCall = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);

  const canHaveTimeout = () => {
    if (!lastCall.current) return true;
    return lastCall.current + interval < Date.now();
  };

  useEffect(() => {
    if (canHaveTimeout()) {
      intervalId.current = window.setTimeout(() => {
        lastCall.current = Date.now();
        setThrottledValue(value);
      }, interval);
    }

    return () => {
      if (intervalId.current) window.clearTimeout(intervalId.current);
    };
  }, [value, interval]);

  return throttledValue;
}
