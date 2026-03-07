import { useState } from 'react';
import { BitcoinCard } from './BitcoinCard';
import { formatBtc } from '../utils/formatters';
import './SendSimulator.css';

const STEPS = ['Dirección', 'Monto y comisión', 'Confirmar', 'Enviado'];

/**
 * Simulador de envío de Bitcoin: dirección, monto, comisión, confirmación
 */
export function SendSimulator({ onComplete }) {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('0.00005'); // ejemplo en BTC

  const amountNum = parseFloat(amount) || 0;
  const feeNum = parseFloat(fee) || 0;
  const total = amountNum + feeNum;
  const canAdvance = step === 0 ? address.trim().length >= 26 : step === 1 ? amountNum > 0 : true;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else onComplete?.();
  };

  return (
    <div className="send-simulator">
      <BitcoinCard title="Simulador: Enviar Bitcoin" icon="📤">
        <p>Practica los pasos de una transacción: pegar la dirección del destinatario, indicar monto y comisión de red, y confirmar. No se envía dinero real.</p>
      </BitcoinCard>

      <div className="send-simulator__steps">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`send-simulator__step ${i <= step ? 'send-simulator__step--active' : ''}`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <div className="send-simulator__content">
        {step === 0 && (
          <div className="send-simulator__form">
            <label htmlFor="send-address">Dirección Bitcoin del destinatario</label>
            <input
              id="send-address"
              type="text"
              placeholder="Ej: bc1q..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="send-simulator__input"
            />
            <p className="send-simulator__hint">Siempre verifica que la dirección sea correcta. Una vez enviado, no hay vuelta atrás.</p>
          </div>
        )}

        {step === 1 && (
          <div className="send-simulator__form">
            <label htmlFor="send-amount">Cantidad a enviar (BTC)</label>
            <input
              id="send-amount"
              type="number"
              min="0"
              step="0.00001"
              placeholder="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="send-simulator__input"
            />
            <label htmlFor="send-fee">Comisión de red (BTC) — estimada</label>
            <input
              id="send-fee"
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="send-simulator__input"
            />
            <p className="send-simulator__hint">La comisión la pagan los mineros. A mayor comisión, más rápida suele ser la confirmación.</p>
          </div>
        )}

        {step === 2 && (
          <div className="send-simulator__review">
            <p><strong>A:</strong> {address || '—'}</p>
            <p><strong>Monto:</strong> {formatBtc(amountNum)}</p>
            <p><strong>Comisión:</strong> {formatBtc(feeNum)}</p>
            <p><strong>Total a descontar:</strong> {formatBtc(total)}</p>
            <p className="send-simulator__warn">En una transacción real, al confirmar los fondos saldrían de tu billetera. Aquí es solo simulación.</p>
          </div>
        )}

        {step === 3 && (
          <div className="send-simulator__done">
            <p className="send-simulator__done-icon">✅</p>
            <p>Simulación de envío completada. En la vida real, la transacción aparecería en la blockchain y el destinatario vería el saldo después de las confirmaciones.</p>
          </div>
        )}
      </div>

      <div className="send-simulator__actions">
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
    </div>
  );
}
