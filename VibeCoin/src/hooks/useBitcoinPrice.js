import { useState, useEffect } from 'react';
import { getBtcPrice } from '../services/api';

/**
 * Hook que obtiene y refresca el precio de BTC en MXN/USD
 */
export function useBitcoinPrice(refreshIntervalMs = 60_000) {
  const [price, setPrice] = useState({ mxn: 0, usd: 0, change24h: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrice() {
      try {
        setError(null);
        const data = await getBtcPrice();
        if (!cancelled) {
          setPrice(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPrice();
    const id = setInterval(fetchPrice, refreshIntervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshIntervalMs]);

  return { price, loading, error };
}
