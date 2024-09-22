import { useEffect } from "react";
import { Callback } from "../types/callback";

export default function usePageLeave(cb: Callback) {
  useEffect(() => {
    document.addEventListener("mouseout", (event: MouseEvent) => {
      const to = event.relatedTarget as Node;
      if (!to || to.nodeName === "HTML") {
        cb();
      }
    });
    return () => document.removeEventListener("mouseout", cb);
  });
}
