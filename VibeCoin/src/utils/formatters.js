/**
 * Utilidades de formato para números y moneda
 */

export function formatMxn(value) {
  if (value == null || Number.isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatBtc(value) {
  if (value == null || Number.isNaN(value)) return '0.00000000 BTC';
  if (value >= 1) return `${value.toFixed(4)} BTC`;
  if (value >= 0.0001) return `${value.toFixed(6)} BTC`;
  return `${value.toFixed(8)} BTC`;
}

export function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return '0%';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
