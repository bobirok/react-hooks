import { useSyncExternalStore } from "react";
import { Callback } from "../types/callback";

const getSnapshot = () => {
  return document.visibilityState === "visible";
};

const subscribe = (cb: Callback) => {
  document.addEventListener("visibilitychange", cb);

  return () => {
    document.removeEventListener("visibilitychange", cb);
  };
};

export default function useVisibilityChange() {
  const visible = useSyncExternalStore(subscribe, getSnapshot);
  return visible;
}
