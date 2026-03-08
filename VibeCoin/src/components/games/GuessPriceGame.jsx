import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getBitcoinMonthlyHistory, getFallbackMonthly, getRandomPeriodForGuess } from '../../services/historyApi';
import './Games.css';

const PERFECT_THRESHOLD_PERCENT = 2;

function formatUSD(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function GuessPriceGame() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(null);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [errorPercent, setErrorPercent] = useState(null);

  useEffect(() => {
    getBitcoinMonthlyHistory()
      .then((data) => {
        setMonthlyData(data);
        setLoading(false);
      })
      .catch(() => {
        setMonthlyData(getFallbackMonthly());
        setLoading(false);
      });
  }, []);

  const startRound = useCallback(() => {
    const data = monthlyData.length ? monthlyData : getFallbackMonthly();
    const p = getRandomPeriodForGuess(data, 8, 0.25);
    setPeriod(p);
    setGuess('');
    setRevealed(false);
    setErrorPercent(null);
  }, [monthlyData]);

  useEffect(() => {
    if (monthlyData.length > 0 && !period) startRound();
  }, [monthlyData, period, startRound]);

  const submitGuess = () => {
    const num = Number(guess.replace(/[^0-9.]/g, ''));
    if (!period || !Number.isFinite(num) || num <= 0) return;
    setRevealed(true);
    const err = Math.abs(num - period.realEndPrice) / period.realEndPrice * 100;
    setErrorPercent(err);
  };

  if (loading) {
    return (
      <div className="games__box games__box--dark">
        <p className="games__loading">Cargando datos…</p>
      </div>
    );
  }

  if (!period) {
    return (
      <div className="games__box games__box--dark">
        <p className="games__loading">Preparando ronda…</p>
      </div>
    );
  }

  const allPoints = [...period.visible, ...(revealed ? period.hidden : [])];
  const isPerfect = errorPercent !== null && errorPercent < PERFECT_THRESHOLD_PERCENT;

  return (
    <div className="games__box games__box--dark">
      <div className="games__header">
        <h3 className="games__title">Adivina el precio de Bitcoin</h3>
        <p className="games__subtitle">
          Se muestra un tramo histórico. Adivina el precio al que cerró el período (precio final oculto).
        </p>
      </div>

      <div className="games__chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={allPoints} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={(v) => `$${v}`} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #475569' }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Precio']}
            />
            <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2} dot={false} />
            {!revealed && period.visible.length > 0 && (
              <ReferenceLine
                x={period.visible[period.visible.length - 1].label}
                stroke="#64748b"
                strokeDasharray="4 4"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!revealed ? (
        <div className="games__guess-row">
          <label className="games__guess-label">
            Tu predicción (USD):
            <input
              type="text"
              className="games__guess-input"
              placeholder="Ej: 45000"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
            />
          </label>
          <button type="button" className="games__btn games__btn--primary" onClick={submitGuess} disabled={!guess.trim()}>
            Ver resultado
          </button>
        </div>
      ) : (
        <div className="games__result">
          <h4>Resultado</h4>
          <p>Precio real al cierre: <strong>{formatUSD(period.realEndPrice)}</strong></p>
          <p>Tu predicción: <strong>{formatUSD(Number(guess.replace(/[^0-9.]/g, '')))}</strong></p>
          <p>Error: <strong>{errorPercent.toFixed(2)}%</strong></p>
          {isPerfect && <p className="games__result--perfect">¡Predicción perfecta!</p>}
          <button type="button" className="games__btn games__btn--primary" onClick={startRound}>
            Otra ronda
          </button>
        </div>
      )}
    </div>
  );
}
