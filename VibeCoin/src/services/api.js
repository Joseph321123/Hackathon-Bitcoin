/**
 * api.js — Servicios de API para VibeCoin.
 *
 * - CoinGecko: precio de Bitcoin (MXN, USD), cambio 24h, gráfico 30 días y overview de mercado.
 *   En desarrollo las peticiones pasan por el proxy de Vite (/api-coingecko) para evitar CORS.
 * - Caché en memoria para simple/price (90 s) y backoff tras 429 para no saturar la API.
 * - BTC Map: ubicaciones de negocios que aceptan Bitcoin; si falla, el consumidor usa fallback local.
 * - Helpers: mxnToBtc para conversión MXN → BTC.
 */

const COINGECKO_BASE = import.meta.env.DEV
  ? '/api-coingecko/api/v3'
  : 'https://api.coingecko.com/api/v3';
const COINGECKO_SIMPLE = `${COINGECKO_BASE}/simple/price?ids=bitcoin&vs_currencies=mxn,usd&include_24hr_change=true`;
const BTCMAP_URL = 'https://api.btcmap.org/v2/elements';

const FALLBACK_PRICE = { mxn: 1_800_000, usd: 100_000, change24h: 0 };

let simplePriceCache = null;
let simplePriceCacheTime = 0;
let last429Time = 0;
const CACHE_TTL_MS = 90_000;
const BACKOFF_AFTER_429_MS = 300_000;

/** Obtiene simple/price con caché y respeto a 429 (rate limit). */
async function fetchSimplePrice() {
  if (last429Time && Date.now() - last429Time < BACKOFF_AFTER_429_MS) {
    return null;
  }
  if (simplePriceCache && Date.now() - simplePriceCacheTime < CACHE_TTL_MS) {
    return simplePriceCache;
  }
  try {
    const res = await fetch(COINGECKO_SIMPLE);
    if (res.status === 429) {
      last429Time = Date.now();
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    simplePriceCache = data;
    simplePriceCacheTime = Date.now();
    return data;
  } catch {
    return null;
  }
}

/**
 * Obtiene el precio actual de Bitcoin en MXN y USD desde CoinGecko.
 * Usa caché 90 s para no duplicar peticiones con el market overview.
 * @returns {Promise<{ mxn: number, usd: number, change24h: number }>}
 */
export async function getBtcPrice() {
  try {
    const data = await fetchSimplePrice();
    if (!data) return FALLBACK_PRICE;
    const btc = data.bitcoin ?? {};
    return {
      mxn: btc.mxn ?? 0,
      usd: btc.usd ?? 0,
      change24h: btc.mxn_24h_change ?? btc.usd_24h_change ?? 0,
    };
  } catch (err) {
    console.warn('CoinGecko no disponible, usando precio de respaldo:', err.message);
    return FALLBACK_PRICE;
  }
}

const FALLBACK_MARKET = { priceUsd: 97000, change24h: 0, marketCap: 1.9e12, dominance: 54 };

/**
 * Precio de Bitcoin últimos 30 días para gráfico (CoinGecko market_chart).
 * @returns {Promise<{ prices: Array<[number, number]>, currentPrice: number, trend: number }>}
 */
export async function getBtcChart30d() {
  try {
    const res = await fetch(`${COINGECKO_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=30`);
    if (!res.ok) return null;
    const data = await res.json();
    const prices = data.prices ?? [];
    const currentPrice = prices.length > 0 ? prices[prices.length - 1][1] : 0;
    const firstPrice = prices.length > 0 ? prices[0][1] : 0;
    const trend = firstPrice > 0 ? ((currentPrice - firstPrice) / firstPrice) * 100 : 0;
    return { prices, currentPrice, trend };
  } catch (e) {
    return null;
  }
}

/**
 * Overview de mercado: usa la misma llamada simple/price (con caché) para no pasarnos del límite (429).
 * Market cap y dominance son valores de referencia.
 */
export async function getBtcMarketOverview() {
  try {
    const data = await fetchSimplePrice();
    if (!data) return FALLBACK_MARKET;
    const btc = data.bitcoin ?? {};
    const priceUsd = btc.usd ?? 0;
    const change24h = btc.usd_24h_change ?? btc.mxn_24h_change ?? 0;
    return {
      priceUsd,
      change24h,
      marketCap: FALLBACK_MARKET.marketCap,
      dominance: FALLBACK_MARKET.dominance,
    };
  } catch (err) {
    console.warn('Market overview no disponible:', err.message);
    return FALLBACK_MARKET;
  }
}

/**
 * Convierte MXN a BTC usando el precio actual
 * @param {number} mxn - Cantidad en pesos
 * @param {number} btcPriceMxn - Precio de 1 BTC en MXN
 */
export function mxnToBtc(mxn, btcPriceMxn) {
  if (!btcPriceMxn || btcPriceMxn <= 0) return 0;
  return mxn / btcPriceMxn;
}

/**
 * Obtiene ubicaciones de negocios que aceptan Bitcoin (BTC Map API o fallback)
 * @returns {Promise<Array<{ id: string, lat: number, lon: number, name?: string, tags?: object }>>}
 */
export async function getBitcoinLocations() {
  try {
    const res = await fetch(`${BTCMAP_URL}?limit=200`);
    if (!res.ok) throw new Error('Error BTC Map');
    const data = await res.json();
    const arr = Array.isArray(data) ? data : (data.elements ?? []);
    return arr
      .filter((e) => e.lat != null && e.lon != null)
      .map((e) => ({
        id: String(e.id ?? e.osm_id ?? Math.random()),
        lat: Number(e.lat),
        lon: Number(e.lon),
        name: e.tags?.name ?? 'Negocio Bitcoin',
        tags: e.tags ?? {},
      }));
  } catch (err) {
    console.warn('BTC Map no disponible, usando datos estáticos:', err.message);
    return [];
  }
}
