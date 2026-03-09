/**
 * Buy.jsx — Página del simulador de compra (ruta /comprar).
 *
 * Renderiza BuySimulator (conversión MXN → BTC con precio en vivo). Al completar el flujo
 * del simulador se llama onComplete = markBuySimDone para marcar el paso "Comprar" en el progreso.
 */
import { BuySimulator } from '../components/BuySimulator';
import { useProgress } from '../hooks/useProgress';

export function Buy() {
  const { markBuySimDone } = useProgress();

  return (
    <div className="page page--buy">
      <BuySimulator onComplete={markBuySimDone} />
    </div>
  );
}
