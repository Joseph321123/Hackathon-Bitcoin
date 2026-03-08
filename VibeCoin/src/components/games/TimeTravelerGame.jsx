import { useState, useEffect, useCallback } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { getBitcoinMonthlyHistory, getFallbackMonthly } from '../../services/historyApi';
import './Games.css';

const START_USD = 1000;

const STORAGE_KEY = 'vibecoin-time-traveler-best';

function formatUSD(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function TimeTravelerGame() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthIndex, setMonthIndex] = useState(0);
  const [usd, setUsd] = useState(START_USD);
  const [btc, setBtc] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch { return 0; }
  });

  const currentPrice = monthlyData[monthIndex]?.price ?? 0;
  const portfolioValue = usd + btc * currentPrice;
  const totalMonths = monthlyData.length;

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

  const doAction = useCallback(
    (action) => {
      if (monthIndex >= totalMonths - 1 || !currentPrice) return;
      let newUsd = usd;
      let newBtc = btc;
      if (action === 'buy' && usd > 0) {
        const spend = Math.min(usd, usd * 0.5);
        newBtc = btc + spend / currentPrice;
        newUsd = usd - spend;
      } else if (action === 'sell' && btc > 0) {
        const sellBtc = btc * 0.5;
        newUsd = usd + sellBtc * currentPrice;
        newBtc = btc - sellBtc;
      }
      setUsd(newUsd);
      setBtc(newBtc);
      setHistory((h) => [...h, { monthIndex, action, price: currentPrice }]);
      const nextIndex = monthIndex + 1;
      if (nextIndex >= totalMonths - 1) {
        const finalPrice = monthlyData[totalMonths - 1]?.price ?? currentPrice;
        const finalVal = newUsd + newBtc * finalPrice;
        setGameOver(true);
        if (finalVal > bestScore) {
          setBestScore(finalVal);
          try {
            localStorage.setItem(STORAGE_KEY, String(finalVal));
          } catch (_) {}
        }
      }
      setMonthIndex(nextIndex);
    },
    [monthIndex, usd, btc, currentPrice, totalMonths, monthlyData, bestScore]
  );

  const resetGame = useCallback(() => {
    setMonthIndex(0);
    setUsd(START_USD);
    setBtc(0);
    setHistory([]);
    setGameOver(false);
  }, []);

  if (loading) {
    return (
      <div className="games__box games__box--dark">
        <p className="games__loading">Cargando datos históricos de Bitcoin…</p>
      </div>
    );
  }

  const hodlStartPrice = monthlyData[0]?.price ?? 0;
  const hodlEndPrice = monthlyData[totalMonths - 1]?.price ?? 0;
  const hodlBtc = hodlStartPrice > 0 ? START_USD / hodlStartPrice : 0;
  const hodlValue = hodlBtc * hodlEndPrice;
  const vsHodl = hodlValue > 0 ? ((portfolioValue - hodlValue) / hodlValue) * 100 : 0;

  const chartData = monthlyData.map((d, i) => ({
    ...d,
    index: i,
    visible: hardMode ? i <= monthIndex : true,
  }));
  const visibleData = hardMode ? chartData.filter((d) => d.index <= monthIndex) : chartData;

  return (
    <div className="games__box games__box--dark">
      <div className="games__header">
        <h3 className="games__title">Bitcoin Time Traveler</h3>
        <p className="games__subtitle">
          Estás en {monthlyData[monthIndex]?.label ?? '…'}. Empiezas en 2013 con $1,000. Elige una acción cada mes.
        </p>
        <label className="games__checkbox">
          <input type="checkbox" checked={hardMode} onChange={(e) => setHardMode(e.target.checked)} />
          <span>Modo difícil (solo ves el pasado, no el futuro)</span>
        </label>
      </div>

      <div className="games__chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={visibleData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #475569' }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Precio']}
              labelFormatter={(l) => l}
            />
            <Area type="monotone" dataKey="price" fill="url(#btcGrad)" stroke="none" />
            <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2} dot={false} />
            {!hardMode && monthIndex < totalMonths && (
              <ReferenceLine x={monthlyData[monthIndex]?.label} stroke="#22c55e" strokeWidth={2} />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="games__portfolio">
        <div className="games__stat">
          <span className="games__stat-label">USD</span>
          <span className="games__stat-value">{formatUSD(usd)}</span>
        </div>
        <div className="games__stat">
          <span className="games__stat-label">BTC</span>
          <span className="games__stat-value">{btc.toFixed(6)}</span>
        </div>
        <div className="games__stat games__stat--total">
          <span className="games__stat-label">Valor total</span>
          <span className="games__stat-value">{formatUSD(portfolioValue)}</span>
        </div>
        <div className="games__stat">
          <span className="games__stat-label">Precio BTC</span>
          <span className="games__stat-value">{formatUSD(currentPrice)}</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="games__actions">
          <button type="button" className="games__btn games__btn--buy" onClick={() => doAction('buy')} disabled={usd <= 0}>
            Comprar
          </button>
          <button type="button" className="games__btn games__btn--hold" onClick={() => doAction('hold')}>
            Mantener
          </button>
          <button type="button" className="games__btn games__btn--sell" onClick={() => doAction('sell')} disabled={btc <= 0}>
            Vender
          </button>
        </div>
      ) : (
        <div className="games__result">
          <h4>Resultado</h4>
          <p>Tu valor final: <strong>{formatUSD(portfolioValue)}</strong></p>
          <p>Si hubieras hecho HODL (comprar todo al inicio): <strong>{formatUSD(hodlValue)}</strong></p>
          <p className={vsHodl >= 0 ? 'games__result--win' : 'games__result--lose'}>
            {vsHodl >= 0 ? '+' : ''}{vsHodl.toFixed(1)}% vs HODL
          </p>
          <p className="games__best">Mejor puntuación guardada: {formatUSD(bestScore)}</p>
          <button type="button" className="games__btn games__btn--primary" onClick={resetGame}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
