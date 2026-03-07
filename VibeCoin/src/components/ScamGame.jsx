import { useState, useMemo } from 'react';
import { scamCards } from '../data/scamData';
import { BitcoinCard } from './BitcoinCard';
import './ScamGame.css';

/**
 * Juego: ¿Es estafa o es seguro? El usuario elige SAFE o SCAM
 */
export function ScamGame({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  const [shuffleKey, setShuffleKey] = useState(0);
  const shuffled = useMemo(
    () => [...scamCards].sort(() => Math.random() - 0.5),
    [shuffleKey]
  );
  const card = shuffled[index];
  const total = shuffled.length;
  const isLast = index >= total - 1;

  const answer = (userSaidScam) => {
    if (answered) return;
    const correct = userSaidScam === card.isScam;
    setScore((s) => s + (correct ? 1 : 0));
    setFeedback({ correct, explanation: card.explanation });
    setAnswered(true);
  };

  const next = () => {
    setFeedback(null);
    setAnswered(false);
    if (isLast) {
      onComplete?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setAnswered(false);
    setShuffleKey((k) => k + 1);
  };

  if (!card) return null;

  return (
    <div className="scam-game">
      <BitcoinCard title="¿Estafa o seguro?" icon="🛡️">
        <p>Lee cada situación y elige si es una estafa o una práctica segura. Así aprendes a protegerte.</p>
      </BitcoinCard>

      <div className="scam-game__progress">
        Pregunta {index + 1} de {total} — Aciertos: {score}
      </div>

      <div className="scam-game__card">
        <h3 className="scam-game__title">{card.title}</h3>
        <p className="scam-game__desc">{card.description}</p>

        {!answered ? (
          <div className="scam-game__buttons">
            <button
              type="button"
              className="scam-game__btn scam-game__btn--safe"
              onClick={() => answer(false)}
            >
              ✅ Seguro
            </button>
            <button
              type="button"
              className="scam-game__btn scam-game__btn--scam"
              onClick={() => answer(true)}
            >
              🚨 Estafa
            </button>
          </div>
        ) : (
          <div className="scam-game__feedback">
            <p className={`scam-game__result ${feedback.correct ? 'scam-game__result--ok' : 'scam-game__result--fail'}`}>
              {feedback.correct ? '✓ Correcto' : '✗ Incorrecto'}
            </p>
            <p className="scam-game__explanation">{feedback.explanation}</p>
            <button type="button" className="btn btn--primary" onClick={next}>
              {isLast ? 'Ver resultado final' : 'Siguiente'}
            </button>
          </div>
        )}
      </div>

      {isLast && answered && (
        <div className="scam-game__final">
          <p>Puntuación final: {score} / {total}</p>
          <button type="button" className="btn btn--secondary" onClick={reset}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
