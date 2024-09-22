import * as React from "react";
import { Callback } from "../types/callback";

export default function useClickAway(cb: Callback) {
  const ref = React.useRef<HTMLElement>(null);

  const handleCb = React.useCallback(
    (e: Event) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        cb(e);
      }
    },
    [ref, cb]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", handleCb);

    return () => document.removeEventListener("mousedown", handleCb);
  }, []);

  return ref;
}
