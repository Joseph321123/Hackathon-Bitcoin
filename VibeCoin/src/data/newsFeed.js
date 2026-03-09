/**
 * Feed de noticias (estructura para futura API; datos de ejemplo/curated).
 * Puede reemplazarse por CryptoCompare, NewsAPI, etc.
 */
export const NEWS_ITEMS = [
  {
    id: '1',
    title: 'Bitcoin supera resistencia clave en mercados',
    source: 'CoinDesk',
    summary: 'El precio de BTC se mantiene por encima de niveles técnicos importantes mientras aumenta el interés institucional.',
    date: new Date().toISOString().slice(0, 10),
    category: 'market',
  },
  {
    id: '2',
    title: 'Reguladores avanzan en marco para cripto en Latam',
    source: 'Bitso Blog',
    summary: 'Varios países de la región trabajan en normativas para exchanges y activos digitales.',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    category: 'regulation',
  },
  {
    id: '3',
    title: 'Lightning Network alcanza nuevo récord de capacidad',
    source: 'Bitcoin Magazine',
    summary: 'La red de segunda capa sigue creciendo en canales y liquidez.',
    date: new Date(Date.now() - 172800000).toISOString().slice(0, 10),
    category: 'technology',
  },
  {
    id: '4',
    title: 'ETF de Bitcoin acumula más entradas institucionales',
    source: 'CoinDesk',
    summary: 'Los fondos cotizados en EE.UU. reflejan un flujo positivo en las últimas semanas.',
    date: new Date(Date.now() - 259200000).toISOString().slice(0, 10),
    category: 'market',
  },
];

export const CATEGORY_LABELS = {
  market: 'Mercado',
  regulation: 'Regulación',
  technology: 'Tecnología',
};
