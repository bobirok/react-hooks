import { useEffect, useState } from "react";
import { Callback } from "../types/callback";

interface IOptions {
  maxRetries: number;
}

export default function useContinuousRetry(
  cb: Callback,
  interval = 100,
  options: IOptions
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = useState(false);

  useEffect(() => {
    let retries = 0;
    const id = window.setInterval(() => {
      if (cb()) {
        setHasResolved(true);
        return window.clearInterval(id);
      } else if (retries >= maxRetries) {
        return window.clearInterval(id);
      } else {
        retries++;
      }
    }, interval);

    return () => window.clearInterval(id);
  }, [interval]);

  return hasResolved;
}
