import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import './Congratulations.css';

/**
 * Pantalla de celebración al completar todos los pasos (VibeCoin Master)
 */
export function Congratulations() {
  const { progress, completedCount, totalSteps } = useProgress();
  const allDone = completedCount >= totalSteps;

  if (!allDone) {
    return (
      <div className="congratulations congratulations--locked">
        <h1>VibeCoin Master</h1>
        <p>Completa los {totalSteps} pasos para desbloquear esta pantalla.</p>
        <p className="congratulations__progress">Llevas {completedCount} de {totalSteps}.</p>
        <Link to="/" className="btn btn--primary">Ir al inicio</Link>
      </div>
    );
  }

  return (
    <div className="congratulations">
      <div className="congratulations__confetti" aria-hidden />
      <h1 className="congratulations__title">¡Felicidades!</h1>
      <p className="congratulations__subtitle">Completaste todos los pasos de VibeCoin.</p>
      <div className="congratulations__badge" aria-hidden>₿</div>
      <p className="congratulations__text">
        Ya conoces lo básico de Bitcoin, cómo comprar y enviar, cómo protegerte de estafas y dónde usarlo.
        Sigue aprendiendo y nunca compartas tu frase semilla con nadie.
      </p>
      <Link to="/" className="btn btn--primary congratulations__btn">Volver al inicio</Link>
    </div>
  );
}
