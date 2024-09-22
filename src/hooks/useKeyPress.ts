import { useEffect } from "react";
import { Callback } from "../types/callback";

interface IOptions {
  event?: string;
  target?: HTMLElement;
  eventOptions?: boolean | AddEventListenerOptions;
}

export default function useKeyPress(
  key: string,
  cb: Callback,
  options: IOptions = {}
) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;

  useEffect(() => {
    const handler = (e: Event) => {
      if ((<KeyboardEvent>e).key === key) {
        cb(e);
      }
    };
    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [event, key, eventOptions, target]);
}
