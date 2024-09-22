import { useCallback, useSyncExternalStore } from "react";
import { Callback } from "../types/callback";

export default function useMediaQuery(query: string) {
  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const subscribe = useCallback((cb: Callback) => {
    window.matchMedia(query).addEventListener("change", cb);

    return () => window.matchMedia(query).removeEventListener("change", cb);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot);
}
