import { Link } from 'react-router-dom';
import './ProgressTracker.css';

const steps = [
  { path: '/learn', label: 'Aprende', key: 'learnedBasics' },
  { path: '/comprar', label: 'Comprar', key: 'completedBuySim' },
  { path: '/wallet-game', label: 'Wallet', key: 'completedSeedGame' },
  { path: '/scam', label: 'Estafas', key: 'completedScamGame' },
  { path: '/enviar', label: 'Enviar', key: 'completedSendSim' },
  { path: '/quiz', label: 'Quiz', key: 'quizCompleted' },
  { path: '/mapa', label: 'Mapa', key: 'visitedMap' },
];

/**
 * Barra de progreso del aprendizaje (pasos completados / total)
 */
export function ProgressTracker({ progress, completedCount, totalSteps }) {
  return (
    <nav className="progress-tracker" aria-label="Progreso de aprendizaje">
      <div className="progress-tracker__bar-wrap">
        <div
          className="progress-tracker__bar"
          style={{ width: `${(completedCount / totalSteps) * 100}%` }}
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label={`${completedCount} de ${totalSteps} pasos completados`}
        />
      </div>
      <p className="progress-tracker__label">
        {completedCount} / {totalSteps} pasos
        {completedCount >= totalSteps && (
          <span className="progress-tracker__done-hint"> — ¡Completado! Ve al inicio y haz clic en <strong>VibeCoin Master</strong>.</span>
        )}
      </p>
      <ul className="progress-tracker__steps">
        {steps.map(({ path, label, key }) => (
          <li key={path}>
            <Link
              to={path}
              className={`progress-tracker__step ${progress[key] ? 'progress-tracker__step--done' : ''}`}
              title={label}
            >
              <span className="progress-tracker__step-dot" />
              <span className="progress-tracker__step-label">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
