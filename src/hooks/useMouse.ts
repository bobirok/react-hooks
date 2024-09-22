import { useEffect, useRef, useState } from "react";

export default function useMouse() {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setState((prev) => {
        let elementX = 0;
        let elementY = 0;
        let elementPositionX = 0;
        let elementPositionY = 0;
        if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
          const { left, top } = ref.current.getBoundingClientRect();
          elementPositionX = left + window.scrollX;
          elementPositionY = top + window.scrollY;
          elementX = e.pageX - elementPositionX;
          elementY = e.pageY - elementPositionY;
        }
        return {
          ...prev,
          x: e.pageX,
          y: e.pageY,
          elementX: elementX,
          elementY: elementY,
          elementPositionX: elementPositionX,
          elementPositionY: elementPositionY,
        };
      });
    });

    return () => document.removeEventListener("mousemove", () => {});
  }, []);

  return [state, ref];
}
