import { useState, useEffect } from 'react';
import { getBtcPrice, mxnToBtc } from '../services/api';
import { formatMxn, formatBtc, formatPercent } from '../utils/formatters';
import { BitcoinCard } from './BitcoinCard';
import './BuySimulator.css';

const STEPS = ['Ingresa el monto', 'Revisa el cambio', 'Confirma la compra', '¡Listo!'];

/**
 * Simulador de compra: MXN → BTC con precio en tiempo real (CoinGecko)
 */
export function BuySimulator({ onComplete }) {
  const [mxn, setMxn] = useState('');
  const [price, setPrice] = useState({ mxn: 0, usd: 0, change24h: 0 });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getBtcPrice()
      .then((p) => { if (!cancelled) setPrice(p); })
      .catch(() => { if (!cancelled) setPrice({ mxn: 1_800_000, usd: 100_000, change24h: 0 }); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const amount = Number(mxn) || 0;
  const btc = mxnToBtc(amount, price.mxn);
  const canAdvance = step === 0 ? amount > 0 : true;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else onComplete?.();
  };

  return (
    <div className="buy-simulator">
      <BitcoinCard title="Simulador de compra (MXN → BTC)" icon="🛒">
        <p>Practica cómo sería comprar Bitcoin con pesos. El precio se actualiza con datos en tiempo real.</p>
      </BitcoinCard>

      {loading ? (
        <p className="buy-simulator__loading">Cargando precio de Bitcoin…</p>
      ) : (
        <>
          <div className="buy-simulator__progress">
            {STEPS.map((label, i) => (
              <span
                key={label}
                className={`buy-simulator__step ${i <= step ? 'buy-simulator__step--active' : ''}`}
              >
                {i + 1}. {label}
              </span>
            ))}
          </div>

          <div className="buy-simulator__content">
            {step === 0 && (
              <div className="buy-simulator__form">
                <label htmlFor="mxn-input">Monto en MXN</label>
                <input
                  id="mxn-input"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Ej: 500"
                  value={mxn}
                  onChange={(e) => setMxn(e.target.value)}
                  className="buy-simulator__input"
                />
                <p className="buy-simulator__hint">Precio actual: 1 BTC = {formatMxn(price.mxn)} ({formatPercent(price.change24h)} 24h)</p>
              </div>
            )}

            {step === 1 && (
              <div className="buy-simulator__review">
                <p><strong>Vas a comprar:</strong> {formatBtc(btc)}</p>
                <p><strong>Pagas:</strong> {formatMxn(amount)}</p>
                <p><strong>Precio de referencia:</strong> {formatMxn(price.mxn)} / BTC</p>
              </div>
            )}

            {step === 2 && (
              <div className="buy-simulator__confirm">
                <p>En una compra real seguirías a un exchange (ej. Bitso), vincularías tu cuenta y harías SPEI o tarjeta. Aquí es solo simulación.</p>
                <p><strong>Resumen:</strong> {formatMxn(amount)} → {formatBtc(btc)}</p>
              </div>
            )}

            {step === 3 && (
              <div className="buy-simulator__done">
                <p className="buy-simulator__done-icon">✅</p>
                <p>Simulación completada. En la vida real, compra solo en exchanges verificados (Bitso, Coinbase, etc.) y nunca compartas tu frase semilla.</p>
              </div>
            )}
          </div>

          <div className="buy-simulator__actions">
            {step > 0 && (
              <button type="button" className="btn btn--secondary" onClick={() => setStep((s) => s - 1)}>
                Atrás
              </button>
            )}
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleNext}
              disabled={!canAdvance}
            >
              {step < STEPS.length - 1 ? 'Siguiente' : 'Finalizar'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
