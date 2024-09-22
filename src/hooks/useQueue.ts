import { useCallback, useMemo, useState } from "react";

export default function useQueue<T>(initialValue: Array<T> = []) {
  const [queue, setQueue] = useState(initialValue);

  const add = useCallback((el: T) => {
    setQueue((q) => {
      return [...q, el];
    });
  }, []);

  const remove = useCallback(() => {
    const removedItem = queue[0];

    setQueue(queue.slice(1));

    return removedItem;
  }, [queue]);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  const first = useMemo(() => {
    return queue[0];
  }, [queue]);

  const last = useMemo(() => {
    return queue[queue.length - 1];
  }, [queue]);

  const size = useMemo(() => {
    return queue.length;
  }, [queue]);

  return {
    add,
    remove,
    clear,
    first: first,
    last: last,
    size: size,
    queue,
  };
}
