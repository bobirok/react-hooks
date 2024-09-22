import { useEffect, useRef } from "react";
import { Callback } from "../types/callback";

interface IOptions {
  ms: number;
  when: boolean;
  startImmediately: boolean;
}

export default function useIntervalWhen(
  cb: Callback,
  { ms, when, startImmediately }: IOptions
) {
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    if (when && startImmediately) cb();
    intervalId.current = window.setInterval(() => {
      if (when) {
        cb();
      }
    }, ms);
    return () => clear();
  }, [ms, when, startImmediately, clear]);

  function clear() {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }
  }

  return clear;
}
