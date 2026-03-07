/**
 * Servicios de API para VibeCoin
 * CoinGecko (precio BTC) y datos de adopción
 */

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=mxn,usd&include_24hr_change=true';
const BTCMAP_URL = 'https://api.btcmap.org/v2/elements';

/**
 * Obtiene el precio actual de Bitcoin en MXN y USD desde CoinGecko
 * @returns {Promise<{ mxn: number, usd: number, change24h: number }>}
 */
export async function getBtcPrice() {
  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) throw new Error('Error al obtener precio');
    const data = await res.json();
    const btc = data.bitcoin;
    return {
      mxn: btc.mxn ?? 0,
      usd: btc.usd ?? 0,
      change24h: btc.mxn_24h_change ?? btc.usd_24h_change ?? 0,
    };
  } catch (err) {
    console.warn('CoinGecko no disponible, usando precio de respaldo:', err.message);
    return { mxn: 1_800_000, usd: 100_000, change24h: 0 };
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
