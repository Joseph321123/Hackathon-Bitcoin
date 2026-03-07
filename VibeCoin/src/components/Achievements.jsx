import { Link } from 'react-router-dom';
import { badgesList } from '../data/badges';
import './Achievements.css';

/**
 * Insignias desbloqueadas según el progreso. Cada una enlaza a su sección.
 */
export function Achievements({ progress }) {
  const completedCount = [
    progress?.learnedBasics,
    progress?.completedBuySim,
    progress?.completedSeedGame,
    progress?.completedScamGame,
    progress?.completedSendSim,
    progress?.quizCompleted,
    progress?.visitedMap,
  ].filter(Boolean).length;
  const allDone = completedCount >= 7;

  return (
    <section className="achievements" aria-labelledby="achievements-title">
      <h2 id="achievements-title" className="achievements__title">Tu progreso</h2>
      <p className="achievements__subtitle">Haz clic en un logro para ir a esa sección. <strong>VibeCoin Master</strong> se desbloquea al completar los 7 pasos; luego haz clic para ver tu celebración.</p>
      <div className="achievements__grid">
        {badgesList.map((badge) => {
          const unlocked = badge.progressKey ? progress?.[badge.progressKey] : allDone;
          const El = badge.path ? Link : 'div';
          const props = badge.path ? { to: badge.path, title: badge.desc } : { title: badge.desc };
          return (
            <El
              key={badge.id}
              {...props}
              className={`achievements__badge ${unlocked ? 'achievements__badge--unlocked' : ''} ${badge.path ? 'achievements__badge--link' : ''}`}
            >
              <span className="achievements__icon" aria-hidden>{badge.icon}</span>
              <span className="achievements__label">{badge.label}</span>
            </El>
          );
        })}
      </div>
    </section>
  );
}
