/**
 * ProgressTracker.jsx — Barra de progreso de la ruta principiante.
 *
 * Solo se renderiza cuando la ruta actual está en PRINCIPIANTE_PATHS (Layout.jsx).
 * Recibe progress, completedCount y totalSteps desde useProgress(). Muestra una barra de
 * progreso visual, el texto "X / 6 pasos", el siguiente paso pendiente y un enlace a
 * "VibeCoin Master" (Felicitaciones) cuando los 6 están completos. Cada paso es un Link
 * a su ruta; los completados llevan la clase progress-tracker__step--done.
 */
import { Link } from 'react-router-dom';
import './ProgressTracker.css';

const steps = [
  { path: '/learn', label: 'Aprende', key: 'learnedBasics' },
  { path: '/comprar', label: 'Comprar', key: 'completedBuySim' },
  { path: '/wallet-game', label: 'Wallet', key: 'completedSeedGame' },
  { path: '/scam', label: 'Estafas', key: 'completedScamGame' },
  { path: '/enviar', label: 'Enviar', key: 'completedSendSim' },
  { path: '/quiz', label: 'Quiz', key: 'quizCompleted' },
];

function getNextStep(progress, stepsList) {
  const next = stepsList.find((s) => !progress[s.key]);
  return next ? next.label : null;
}

export function ProgressTracker({ progress, completedCount, totalSteps }) {
  const allDone = completedCount >= totalSteps;
  const nextLesson = getNextStep(progress, steps);

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
        {nextLesson && !allDone && (
          <span className="progress-tracker__current"> · Siguiente: <strong>{nextLesson}</strong></span>
        )}
        {allDone && (
          <span className="progress-tracker__done-hint"> · ¡Completado! <Link to="/felicitaciones" className="progress-tracker__master-link">VibeCoin Master →</Link></span>
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
        <li>
          <Link
            to="/felicitaciones"
            className={`progress-tracker__step progress-tracker__step--master ${allDone ? 'progress-tracker__step--done' : ''}`}
            title="VibeCoin Master"
          >
            <span className="progress-tracker__step-dot" />
            <span className="progress-tracker__step-label">Master</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
