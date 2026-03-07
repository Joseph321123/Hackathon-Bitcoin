import { useState, useEffect, useCallback } from 'react';
import { quizQuestions } from '../data/quizData';
import { BitcoinCard } from './BitcoinCard';
import './QuizGame.css';

const TIMER_SECONDS = 15;

/**
 * Quiz tipo Kahoot: múltiple opción, temporizador, puntuación, barra de progreso
 */
export function QuizGame({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [phase, setPhase] = useState('playing'); // playing | result | finished

  const question = quizQuestions[index];
  const total = quizQuestions.length;

  const advance = useCallback(() => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(TIMER_SECONDS);
      setPhase('playing');
    } else {
      setPhase('finished');
      onComplete?.(score + (selected === question.correctIndex ? 1 : 0));
    }
  }, [index, total, onComplete, score, question, selected]);

  useEffect(() => {
    if (phase !== 'playing' || answered) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      setPhase('result');
      return;
    }
    const t = setInterval(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, answered, phase]);

  const choose = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    const correct = optionIndex === question.correctIndex;
    setScore((s) => s + (correct ? 1 : 0));
    setPhase('result');
  };

  const progressPercent = ((index + (answered ? 1 : 0)) / total) * 100;

  if (!question) return null;

  return (
    <div className="quiz-game">
      <BitcoinCard title="Quiz Bitcoin" icon="🎮">
        <p>Responde antes de que se acabe el tiempo. Una respuesta correcta por pregunta.</p>
      </BitcoinCard>

      <div className="quiz-game__meta">
        <span>Pregunta {index + 1} de {total}</span>
        <span className="quiz-game__score">Puntos: {score}</span>
      </div>

      <div className="quiz-game__progress-bar">
        <div className="quiz-game__progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="quiz-game__timer" aria-live="polite">
        {phase === 'playing' && !answered ? `⏱️ ${timeLeft}s` : ''}
      </div>

      <div className="quiz-game__card">
        <h2 className="quiz-game__question">{question.question}</h2>

        {phase === 'playing' && (
          <ul className="quiz-game__options" role="listbox" aria-label="Opciones">
            {question.options.map((opt, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`quiz-game__option ${selected === i ? 'quiz-game__option--selected' : ''}`}
                  onClick={() => choose(i)}
                  disabled={answered}
                  role="option"
                  aria-selected={selected === i}
                >
                  <span className="quiz-game__option-letter">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}

        {phase === 'result' && (
          <div className="quiz-game__result">
            <p className={selected === question.correctIndex ? 'quiz-game__result--correct' : 'quiz-game__result--wrong'}>
              {selected === question.correctIndex
                ? '✓ Correcto'
                : selected == null
                  ? `⏱️ Se acabó el tiempo. La respuesta correcta era: ${question.options[question.correctIndex]}`
                  : `✗ La respuesta correcta era: ${question.options[question.correctIndex]}`}
            </p>
            <button type="button" className="btn btn--primary" onClick={advance}>
              {index < total - 1 ? 'Siguiente' : 'Ver resultado final'}
            </button>
          </div>
        )}
      </div>

      {phase === 'finished' && (
        <div className="quiz-game__final" role="alert">
          <h3>Resultado final</h3>
          <p className="quiz-game__final-score">{score} / {total} aciertos</p>
          <p>{score === total ? '¡Perfecto! 🎉' : score >= total / 2 ? 'Muy bien 👍' : 'Sigue practicando con los módulos de aprendizaje.'}</p>
        </div>
      )}
    </div>
  );
}
