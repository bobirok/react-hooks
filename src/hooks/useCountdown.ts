import * as React from "react";

interface IOptions {
  interval: number;
  onTick: () => void;
  onComplete: () => void;
}

export default function useCountdown(endTime: number, options: IOptions) {
  const { interval, onTick, onComplete } = options;
  const [count, setCount] = React.useState(Infinity);
  const intervalId = React.useRef<number | null>(null);

  const handleOnTick = () => {
    if (count === 0) {
      if (intervalId.current) window.clearInterval(intervalId.current);
      onComplete();
    } else {
      setCount(count - 1);
      onTick();
    }
  };

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    intervalId.current = window.setInterval(() => {
      handleOnTick();
    }, interval);

    return () => {
      if (intervalId.current) window.clearInterval(intervalId.current);
    };
  }, []);

  return count;
}
