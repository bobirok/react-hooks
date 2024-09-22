import { useState } from "react";

interface ICounterOptions {
  min: number;
  max: number;
}

export default function useCounter(
  startingValue = 0,
  options: ICounterOptions = { min: 0, max: 10 }
) {
  const { min, max } = options;

  if (startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = useState(startingValue);

  const increment = () => {
    if (!max) setCount(count + 1);
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (!min) setCount(count - 1);
    if (count > min) {
      setCount(count - 1);
    }
  };

  const set = (nextState: number) => {
    if (!min && nextState < count) setCount(nextState);
    if (!max && nextState > count) setCount(nextState);
    if (nextState >= min && nextState <= max && nextState !== count) {
      setCount(nextState);
    }
  };

  const reset = () => {
    setCount(startingValue);
  };

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}
