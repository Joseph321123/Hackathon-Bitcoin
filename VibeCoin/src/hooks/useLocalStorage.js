/**
 * useLocalStorage.js — Persistencia en localStorage con estado en React.
 *
 * - Al montar, lee la clave y parsea JSON; si falla o no existe, usa initialValue.
 * - setValue acepta un valor o una función (prev => next); al actualizar escribe en localStorage.
 * - Usa useRef para leer el valor actual dentro del setter y evitar dependencias que provoquen
 *   bucles en useEffect. La clave de localStorage no debe cambiar en runtime.
 */
import { useState, useCallback, useRef } from 'react';

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
