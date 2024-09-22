import { useEffect, useRef } from "react";

export default function useLogger(name: string, args: Array<any>) {
  const isRendered = useRef(false);
  const argsRef = useRef(args);

  useEffect(() => {
    argsRef.current = args;
  }, [args]);

  useEffect(() => {
    console.log(`${name} mounted:`, argsRef.current);

    return () => {
      console.log(`${name} unmounted:`, argsRef.current);
    };
  }, [name]);

  useEffect(() => {
    if (isRendered.current) {
      console.log(`${name} updated:`, argsRef.current);
    } else {
      isRendered.current = true;
    }
  }, [name, args]);
}
