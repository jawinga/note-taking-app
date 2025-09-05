import { useEffect, useState } from "react";

export function useDebounceSearch<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const delayedValue = setTimeout(() => setDebounced(value), delay);
    return () => clearInterval(delayedValue);
  }, [value, delay]);

  return debounced;
}
