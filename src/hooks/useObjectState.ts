import { useCallback, useState } from "react";

const isPlainObject = (value: object) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

export default function useObjectState(initialValue: object) {
  const [objState, setObjState] = useState(initialValue);

  const setState = useCallback((param: object) => {
    if (typeof param === "function") {
      setObjState((current: object) => {
        const paramRes = param(current);

        if (isPlainObject(paramRes)) {
          return {
            ...current,
            ...paramRes,
          };
        }
      });
    } else {
      if (isPlainObject(param)) {
        setObjState((current) => {
          return {
            ...current,
            ...param,
          };
        });
      }
    }
  }, []);

  return [objState, setState];
}
