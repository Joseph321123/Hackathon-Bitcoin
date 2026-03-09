import { useState, useEffect } from 'react';
import { getMempoolFees, getMempoolStats, getLightningStats } from '../services/dashboardApi';
import './AdvancedDashboard.css';

function formatCapacity(sats) {
  if (!sats) return '—';
  const btc = sats / 1e8;
  if (btc >= 1000) return `${(btc / 1000).toFixed(1)}k BTC`;
  return `${btc.toFixed(0)} BTC`;
}

export function AdvancedDashboard() {
  const [fees, setFees] = useState(null);
  const [mempool, setMempool] = useState(null);
  const [lightning, setLightning] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [f, m, l] = await Promise.all([
        getMempoolFees(),
        getMempoolStats(),
        getLightningStats(),
      ]);
      if (!cancelled) {
        setFees(f);
        setMempool(m);
        setLightning(l);
      }
    }
    load();
    const id = setInterval(load, 60000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return (
    <div className="advanced-dash">
      <div className="advanced-dash__block">
        <h3 className="advanced-dash__title">Lightning Network</h3>
        <div className="advanced-dash__grid">
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Nodos</span>
            <span className="advanced-dash__value">{lightning?.nodeCount != null ? lightning.nodeCount.toLocaleString() : '—'}</span>
          </div>
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Canales</span>
            <span className="advanced-dash__value">{lightning?.channelCount != null ? lightning.channelCount.toLocaleString() : '—'}</span>
          </div>
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Capacidad</span>
            <span className="advanced-dash__value">{formatCapacity(lightning?.capacity)}</span>
          </div>
        </div>
      </div>
      <div className="advanced-dash__block">
        <h3 className="advanced-dash__title">Mempool</h3>
        <div className="advanced-dash__grid">
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Transacciones pendientes</span>
            <span className="advanced-dash__value">{mempool?.count != null ? mempool.count.toLocaleString() : '—'}</span>
          </div>
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Fee rápido (sat/vB)</span>
            <span className="advanced-dash__value">{fees?.fastest ?? '—'}</span>
          </div>
          <div className="advanced-dash__metric">
            <span className="advanced-dash__label">Fee económico (sat/vB)</span>
            <span className="advanced-dash__value">{fees?.economy ?? '—'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
