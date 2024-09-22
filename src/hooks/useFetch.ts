import { useEffect, useReducer, useState } from "react";

interface IAction {
  type: string;
  payload?: any;
}

interface IState {
  error: any;
  data: any;
}

const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

// Hook for fetching data from an API
// Handling errors and loading states
// Caching the data

export default function useFetch(url: string, options: RequestInit = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cache, setCache] = useState<Record<string, any>>({});

  useEffect(() => {
    if (typeof url !== "string") return;

    let ignore = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        if (JSON.stringify(options) in cache) {
          dispatch({
            type: "fetched",
            payload: cache[JSON.stringify(options)] as object,
          });
          return;
        }
        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        setCache((prev) => ({
          ...prev,
          [JSON.stringify(options)]: json,
        }));

        if (ignore === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          dispatch({ type: "error", payload: e });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}
