import { useCallback, useEffect, useState } from "react";

export default function useWindowScroll() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });

  const scrollTo = useCallback((args: Array<any>) => {
    if (args.length === 2) {
      if (isNaN(args[0]) || isNaN(args[1]))
        throw new Error("`Invalid arguments passed to scrollTo`");
    }
    if (args.length === 1) {
      const { left, top, behavior } = args[0];
      if (isNaN(left) || isNaN(top))
        throw new Error("`Invalid arguments passed to scrollTo`");
    }
    window.scrollTo(...args);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      });
    });

    return window.removeEventListener("scroll", () => {});
  }, []);

  return [state, scrollTo];
}
