import { useState, useEffect } from 'react';
import { getBtcMarketOverview } from '../services/api';
import { getMempoolFees, getMempoolStats, getDifficultyAdjustment, getHashrate } from '../services/dashboardApi';
import { NEWS_ITEMS, CATEGORY_LABELS } from '../data/newsFeed';
import { BITCOIN_TIMELINE } from '../data/bitcoinTimeline';
import './Noticias.css';

function formatUSD(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return n ? `$${Number(n).toLocaleString()}` : '—';
}

function formatHashrate(h) {
  if (!h) return '—';
  if (h >= 1e21) return `${(h / 1e21).toFixed(2)} EH/s`;
  if (h >= 1e18) return `${(h / 1e18).toFixed(0)} EH/s`;
  return `${(h / 1e15).toFixed(0)} PH/s`;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function Noticias() {
  const [market, setMarket] = useState(null);
  const [fees, setFees] = useState(null);
  const [mempool, setMempool] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [hashrate, setHashrate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [m, f, mp, d, h] = await Promise.all([
          getBtcMarketOverview(),
          getMempoolFees(),
          getMempoolStats(),
          getDifficultyAdjustment(),
          getHashrate(),
        ]);
        if (!cancelled) {
          setMarket(m);
          setFees(f);
          setMempool(mp);
          setDifficulty(d);
          setHashrate(h);
        }
      } catch (_) {}
      if (!cancelled) setLoading(false);
    }
    load();
    const id = setInterval(load, 90000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return (
    <div className="noticias noticias--dashboard section-page">
      <header className="noticias__header">
        <h1 className="noticias__title">Noticias y datos en vivo</h1>
        <p className="noticias__tagline">
          Métricas de mercado y red, feed de noticias y timeline de hitos de Bitcoin.
        </p>
      </header>

      <section className="noticias__metrics" aria-labelledby="metrics-title">
        <h2 id="metrics-title" className="noticias__section-title">Métricas en vivo</h2>
        {loading ? (
          <p className="noticias__loading">Cargando…</p>
        ) : (
          <div className="noticias__metrics-grid">
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Precio BTC</span>
              <span className="noticias__metric-value">{formatUSD(market?.priceUsd)}</span>
              {market?.change24h != null && (
                <span className={`noticias__metric-change noticias__metric-change--${market.change24h >= 0 ? 'up' : 'down'}`}>
                  {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}% 24h
                </span>
              )}
            </div>
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Dominancia</span>
              <span className="noticias__metric-value">{market?.dominance ? `${market.dominance.toFixed(1)}%` : '—'}</span>
            </div>
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Hashrate</span>
              <span className="noticias__metric-value noticias__metric-value--small">{formatHashrate(hashrate?.hashrate)}</span>
            </div>
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Dificultad</span>
              <span className="noticias__metric-value noticias__metric-value--small">
                {difficulty?.difficulty ? `${(difficulty.difficulty / 1e12).toFixed(2)}T` : '—'}
              </span>
            </div>
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Fee recomendado (sat/vB)</span>
              <span className="noticias__metric-value">{fees?.fastest ?? '—'} (rápido)</span>
            </div>
            <div className="noticias__metric-card">
              <span className="noticias__metric-label">Mempool</span>
              <span className="noticias__metric-value">{mempool?.count != null ? mempool.count.toLocaleString() : '—'} tx</span>
            </div>
          </div>
        )}
      </section>

      <section className="noticias__news" aria-labelledby="news-title">
        <h2 id="news-title" className="noticias__section-title">Feed de noticias</h2>
        <div className="noticias__news-grid">
          {NEWS_ITEMS.map((item) => (
            <article key={item.id} className="noticias__news-card">
              <span className={`noticias__news-tag noticias__news-tag--${item.category}`}>
                {CATEGORY_LABELS[item.category] || item.category}
              </span>
              <h3 className="noticias__news-title">{item.title}</h3>
              <p className="noticias__news-summary">{item.summary}</p>
              <footer className="noticias__news-meta">
                <span className="noticias__news-source">{item.source}</span>
                <span className="noticias__news-date">{formatDate(item.date)}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="noticias__timeline" aria-labelledby="timeline-title">
        <h2 id="timeline-title" className="noticias__section-title">Timeline Bitcoin</h2>
        <ul className="noticias__timeline-list">
          {BITCOIN_TIMELINE.map((event, i) => (
            <li key={i} className="noticias__timeline-item">
              <span className="noticias__timeline-year">{event.year}</span>
              <div className="noticias__timeline-content">
                <strong className="noticias__timeline-label">{event.label}</strong>
                <p className="noticias__timeline-desc">{event.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
