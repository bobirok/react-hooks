import { useCallback, useEffect, useRef } from "react";
import { Callback } from "../types/callback";

export default function useTimeout(cb: Callback, ms: number) {
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      cb();
    }, ms);

    return () => {
      timeoutId.current && window.clearTimeout(timeoutId.current);
    };
  }, [ms]);

  const clear = useCallback(() => {
    !!timeoutId.current && window.clearTimeout(timeoutId.current);
  }, []);

  return clear;
}
