import { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      setSize({ height, width });
    });

    return () => window.removeEventListener("resize", () => {});
  });

  return size;
}
