import { useLayoutEffect } from "react";

export default function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
}
