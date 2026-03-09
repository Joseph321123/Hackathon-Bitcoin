/**
 * MiniBtcChart.jsx — Gráfico de línea del precio de Bitcoin (últimos 30 días).
 *
 * Usa getBtcChart30d() de api.js (CoinGecko market_chart). Muestra el precio actual encima
 * del gráfico y el porcentaje de variación en 30 días; la línea es verde si la tendencia es
 * positiva y roja si es negativa. Recharts con animación. Si la petición falla o se cancela,
 * se muestra estado de carga o mensaje de respaldo.
 */
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getBtcChart30d } from '../services/api';
import './MiniBtcChart.css';

function formatUSD(n) {
  if (!n) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function MiniBtcChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getBtcChart30d()
      .then((res) => {
        if (cancelled || !res) return;
        const chartData = (res.prices || []).map(([ts, price]) => ({
          date: new Date(ts).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
          price,
          full: new Date(ts).getTime(),
        }));
        setData({
          chartData,
          currentPrice: res.currentPrice,
          trend: res.trend,
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="mini-chart mini-chart--loading">
        <p>Cargando gráfico…</p>
      </div>
    );
  }

  if (!data || !data.chartData.length) {
    return (
      <div className="mini-chart mini-chart--loading">
        <p>Precio actual: {formatUSD(data?.currentPrice)}</p>
        <p className="mini-chart__fallback">Datos del gráfico no disponibles.</p>
      </div>
    );
  }

  const isPositive = data.trend >= 0;
  const lineColor = isPositive ? 'var(--success)' : 'var(--error)';

  return (
    <div className="mini-chart">
      <p className="mini-chart__price">
        Precio actual: <strong>{formatUSD(data.currentPrice)}</strong>
        <span className={`mini-chart__trend mini-chart__trend--${isPositive ? 'up' : 'down'}`}>
          {data.trend >= 0 ? '+' : ''}{data.trend.toFixed(2)}% (30 días)
        </span>
      </p>
      <div className="mini-chart__wrap">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data.chartData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--text-muted)" />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              formatter={(value) => [formatUSD(value), 'USD']}
              labelFormatter={(label) => label}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
