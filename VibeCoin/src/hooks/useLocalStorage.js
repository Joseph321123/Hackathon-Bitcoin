import { useState, useCallback, useRef } from 'react';

/**
 * Hook para leer/escribir en localStorage con estado en React.
 * setValue es estable (no depende de stored) para evitar bucles en useEffect.
 */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item != null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const storedRef = useRef(stored);
  storedRef.current = stored;

  const setValue = useCallback(
    (value) => {
      try {
        const next = value instanceof Function ? value(storedRef.current) : value;
        setStored(next);
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch (e) {
        console.warn('useLocalStorage set error', e);
      }
    },
    [key]
  );

  return [stored, setValue];
}
