import { useEffect } from "react";
import { Callback } from "../types/callback";

export default function useInterval(cb: Callback, ms: number) {
  useEffect(() => {
    const interval = setInterval(cb, ms);

    return () => {
      clearInterval(interval);
    };
  }, [ms]);

  return () => {};
}
