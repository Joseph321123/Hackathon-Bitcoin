import { useState, useEffect } from 'react';
import { getBtcPrice, mxnToBtc } from '../services/api';
import { formatMxn, formatBtc } from '../utils/formatters';
import './MxnBtcCalculator.css';

/**
 * Calculadora rápida MXN ↔ BTC con precio en vivo
 */
export function MxnBtcCalculator() {
  const [price, setPrice] = useState({ mxn: 0 });
  const [mode, setMode] = useState('mxn-to-btc'); // 'mxn-to-btc' | 'btc-to-mxn'
  const [mxn, setMxn] = useState('');
  const [btc, setBtc] = useState('');

  useEffect(() => {
    getBtcPrice().then((p) => setPrice(p));
  }, []);

  const mxnNum = parseFloat(mxn) || 0;
  const btcNum = parseFloat(btc) || 0;
  const loading = price.mxn === 0;
  const btcFromMxn = price.mxn > 0 ? mxnToBtc(mxnNum, price.mxn) : 0;
  const mxnFromBtc = price.mxn > 0 ? btcNum * price.mxn : 0;

  return (
    <section className="calculator" aria-labelledby="calc-title">
      <h2 id="calc-title" className="calculator__title">Calculadora MXN ↔ BTC</h2>
      <p className="calculator__hint">{loading ? 'Cargando precio…' : 'Precio de referencia en tiempo real (CoinGecko)'}</p>

      <div className="calculator__tabs">
        <button
          type="button"
          className={`calculator__tab ${mode === 'mxn-to-btc' ? 'calculator__tab--active' : ''}`}
          onClick={() => setMode('mxn-to-btc')}
        >
          MXN → BTC
        </button>
        <button
          type="button"
          className={`calculator__tab ${mode === 'btc-to-mxn' ? 'calculator__tab--active' : ''}`}
          onClick={() => setMode('btc-to-mxn')}
        >
          BTC → MXN
        </button>
      </div>

      {mode === 'mxn-to-btc' && (
        <div className="calculator__form">
          <label htmlFor="calc-mxn">Pesos (MXN)</label>
          <input
            id="calc-mxn"
            type="number"
            min="0"
            step="1"
            placeholder="1000"
            value={mxn}
            onChange={(e) => setMxn(e.target.value)}
            className="calculator__input"
          />
          <p className="calculator__result">
            = <strong>{formatBtc(btcFromMxn)}</strong>
          </p>
        </div>
      )}

      {mode === 'btc-to-mxn' && (
        <div className="calculator__form">
          <label htmlFor="calc-btc">Bitcoin (BTC)</label>
          <input
            id="calc-btc"
            type="number"
            min="0"
            step="0.00000001"
            placeholder="0.001"
            value={btc}
            onChange={(e) => setBtc(e.target.value)}
            className="calculator__input"
          />
          <p className="calculator__result">
            = <strong>{formatMxn(mxnFromBtc)}</strong>
          </p>
        </div>
      )}

      <p className="calculator__rate" aria-live="polite">1 BTC ≈ {loading ? '…' : formatMxn(price.mxn)}</p>
    </section>
  );
}
