/**
 * API de precios históricos de Bitcoin para los juegos de estrategia.
 * CoinGecko range + fallback con datos mensuales locales.
 */

import { BTC_MONTHLY_FALLBACK } from '../data/btcMonthlyFallback.js';

const COINGECKO_RANGE = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range';

/**
 * Convierte array [year, month, price] a objeto { year, month, price, label }.
 */
function toMonthlyPoint(row) {
  const [year, month, price] = row;
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return {
    year,
    month,
    price: Number(price),
    label: `${monthNames[month - 1]} ${year}`,
    timestamp: new Date(year, month - 1, 1).getTime(),
  };
}

/**
 * Obtiene precios mensuales de Bitcoin (USD) desde 2013 hasta hoy.
 * Usa CoinGecko si está disponible; si no, fallback local.
 * @returns {Promise<Array<{ year, month, price, label, timestamp }>>}
 */
export async function getBitcoinMonthlyHistory() {
  try {
    const to = Math.floor(Date.now() / 1000);
    const from = new Date(2013, 0, 1).getTime() / 1000;
    const res = await fetch(`${COINGECKO_RANGE}?vs_currency=usd&from=${from}&to=${to}`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const prices = data.prices || [];
    if (prices.length === 0) throw new Error('No data');

    const byMonth = new Map();
    for (const [ts, p] of prices) {
      const d = new Date(ts);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!byMonth.has(key)) byMonth.set(key, []);
      byMonth.get(key).push(p);
    }

    const result = [];
    for (const [key, vals] of byMonth.entries()) {
      const [y, m] = key.split('-').map(Number);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      result.push({
        year: y,
        month: m + 1,
        price: Math.round(avg * 100) / 100,
        label: `${['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][m]} ${y}`,
        timestamp: new Date(y, m, 1).getTime(),
      });
    }
    result.sort((a, b) => a.timestamp - b.timestamp);
    return result.length > 0 ? result : getFallbackMonthly();
  } catch (e) {
    return getFallbackMonthly();
  }
}

export function getFallbackMonthly() {
  return BTC_MONTHLY_FALLBACK.map(toMonthlyPoint);
}

/**
 * Para Guess the Price: devuelve un subconjunto de N días (como array de puntos diarios simulados).
 * @param {number} monthsBack - Cuántos meses de historia
 * @param {number} hideLastPercent - Porcentaje final a ocultar (0-1)
 * @returns {{ visible: Array<{t, price}>, hidden: Array<{t, price}>, realEndPrice: number }}
 */
export function getRandomPeriodForGuess(monthlyData, monthsBack = 6, hideLastPercent = 0.25) {
  if (!monthlyData || monthlyData.length < monthsBack) {
    monthlyData = getFallbackMonthly();
  }
  const startIdx = Math.max(0, Math.floor(Math.random() * (monthlyData.length - monthsBack)));
  const slice = monthlyData.slice(startIdx, startIdx + monthsBack);
  const split = Math.max(1, Math.floor(slice.length * (1 - hideLastPercent)));
  const visible = slice.slice(0, split);
  const hidden = slice.slice(split);
  const realEndPrice = hidden.length > 0 ? hidden[hidden.length - 1].price : slice[slice.length - 1].price;
  return {
    visible: visible.map((p, i) => ({ t: i, price: p.price, label: p.label })),
    hidden: hidden.map((p, i) => ({ t: visible.length + i, price: p.price, label: p.label })),
    realEndPrice,
    startLabel: slice[0]?.label,
    endLabel: slice[slice.length - 1]?.label,
  };
}
