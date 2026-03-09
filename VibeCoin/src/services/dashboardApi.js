/**
 * APIs para dashboards: mempool.space (fees, mining, mempool).
 * En desarrollo usamos el proxy de Vite para evitar CORS.
 * Si la API falla se devuelven valores de referencia.
 */
const MEMPOOL_BASE = import.meta.env.DEV
  ? '/api-mempool/api/v1'
  : 'https://mempool.space/api/v1';

const FALLBACK_FEES = { fastest: 2, halfHour: 1, hour: 1, economy: 1 };
const FALLBACK_MEMPOOL = { count: 12500, size: 45, bytes: 52 };
const FALLBACK_DIFFICULTY = { progress: 45, difficulty: 67.96e12, estimatedRetarget: null };
const FALLBACK_HASHRATE = { hashrate: 650e18 };
const FALLBACK_LIGHTNING = { nodeCount: 15200, channelCount: 72800, capacity: 5.2e11 };

export async function getMempoolFees() {
  try {
    const res = await fetch(`${MEMPOOL_BASE}/fees/recommended`);
    if (!res.ok) throw new Error('Fees error');
    const data = await res.json();
    return {
      fastest: data.fastestFee ?? FALLBACK_FEES.fastest,
      halfHour: data.halfHourFee ?? FALLBACK_FEES.halfHour,
      hour: data.hourFee ?? FALLBACK_FEES.hour,
      economy: data.economyFee ?? FALLBACK_FEES.economy,
    };
  } catch (e) {
    return FALLBACK_FEES;
  }
}

export async function getMempoolStats() {
  try {
    const res = await fetch(`${MEMPOOL_BASE}/mempool`);
    if (!res.ok) throw new Error('Mempool error');
    const data = await res.json();
    const count = data.count ?? data.transaction_count ?? 0;
    const size = data.vsize ?? data.size ?? 0;
    const bytes = data.size ?? data.bytes ?? 0;
    if (count === 0 && size === 0 && bytes === 0) return FALLBACK_MEMPOOL;
    return { count, size, bytes };
  } catch (e) {
    return FALLBACK_MEMPOOL;
  }
}

export async function getDifficultyAdjustment() {
  try {
    const res = await fetch(`${MEMPOOL_BASE}/difficulty-adjustment`);
    if (!res.ok) throw new Error('Difficulty error');
    const data = await res.json();
    const progress = data.progressPercent ?? data.progress_percent ?? 0;
    const difficulty = data.difficulty ?? data.currentDifficulty ?? 0;
    if (difficulty === 0) return FALLBACK_DIFFICULTY;
    return {
      progress,
      difficulty,
      estimatedRetarget: data.estimatedRetargetDate ?? data.estimated_retarget_date ?? null,
    };
  } catch (e) {
    return FALLBACK_DIFFICULTY;
  }
}

export async function getHashrate() {
  try {
    const res = await fetch(`${MEMPOOL_BASE}/mining/hashrate/1w`);
    if (!res.ok) throw new Error('Hashrate error');
    const data = await res.json();
    const values = Array.isArray(data) ? data : (data?.currentHashrate ? [data] : []);
    const current = values.length ? values[values.length - 1] : 0;
    const h = typeof current === 'object' && current !== null ? current.avgHashrate ?? current.currentHashrate : current;
    const hashrate = Number(h) || 0;
    return { hashrate: hashrate > 0 ? hashrate : FALLBACK_HASHRATE.hashrate };
  } catch (e) {
    return FALLBACK_HASHRATE;
  }
}

/** Lightning Network: mempool.space o valores de referencia */
export async function getLightningStats() {
  try {
    const res = await fetch(`${MEMPOOL_BASE}/lightning/statistics`);
    if (!res.ok) throw new Error('No Lightning API');
    const data = await res.json();
    const nodeCount = data.node_count ?? data.nodeCount ?? 0;
    const channelCount = data.channel_count ?? data.channelCount ?? 0;
    const capacity = data.total_capacity ?? data.totalCapacity ?? 0;
    if (nodeCount === 0 && channelCount === 0) return FALLBACK_LIGHTNING;
    return { nodeCount, channelCount, capacity };
  } catch (e) {
    return FALLBACK_LIGHTNING;
  }
}
