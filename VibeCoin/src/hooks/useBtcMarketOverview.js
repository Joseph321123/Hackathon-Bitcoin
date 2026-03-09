/**
 * useBtcMarketOverview.js — Datos de mercado para el dashboard (Home, etc.).
 *
 * Llama a getBtcMarketOverview() (api.js) al montar y cada refreshIntervalMs (por defecto 5 min).
 * Devuelve { data: { priceUsd, change24h, marketCap, dominance }, loading }. El cleanup del
 * efecto cancela el intervalo y evita actualizar estado si el componente se desmonta.
 */
import { useState, useEffect } from 'react';
import { getBtcMarketOverview } from '../services/api';

export function useBtcMarketOverview(refreshIntervalMs = 300_000) {
  const [data, setData] = useState({
    priceUsd: 0,
    change24h: 0,
    marketCap: 0,
    dominance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const overview = await getBtcMarketOverview();
        if (!cancelled) setData(overview);
      } catch (_) {}
      finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    const id = setInterval(fetchData, refreshIntervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshIntervalMs]);

  return { data, loading };
}
