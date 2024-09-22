import { useCallback, useSyncExternalStore } from "react";
import { Callback } from "../types/callback";

type GenericType = string | number | boolean | Function | object;

const dispatchStorageEvent = (key: string, newValue: string | null) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key: string, value: GenericType) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const subscribe = (cb: Callback) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const getServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

export default function useLocalStorage(
  key: string,
  initialValue: GenericType
) {
  const getSnapshot = () => {
    return getItem(key);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setState = useCallback((newValue: GenericType) => {
    try {
      const nextState =
        typeof newValue === "function"
          ? newValue(JSON.parse(store!))
          : newValue;

      if (nextState === undefined || nextState === null) {
        removeItem(key);
      } else {
        setItem(key, nextState);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return [store ? JSON.parse(store) : initialValue, setState];
}
