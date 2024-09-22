import { useCallback, useState } from "react";

export default function useList<T>(defaultList: Array<T> = []) {
  const [list, setList] = useState(defaultList);

  const set = useCallback((newList: Array<T>) => {
    setList(newList);
  }, []);

  const push = useCallback((newValue: T) => {
    setList((current) => {
      return [...current, newValue];
    });
  }, []);

  const removeAt = useCallback((at: number) => {
    setList((current) => {
      const newArray = [...current.slice(0, at), ...current.slice(at + 1)];
      return newArray;
    });
  }, []);

  const insertAt = useCallback((at: number, value: T) => {
    setList((current) => {
      const newArray = [...current.slice(0, at), value, ...current.slice(at)];
      return newArray;
    });
  }, []);

  const updateAt = useCallback((at: number, newValue: T) => {
    setList((current) => {
      if (current[at]) {
        current[at] = newValue;
        return [...current];
      }
      return current;
    });
  }, []);

  const clear = useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
