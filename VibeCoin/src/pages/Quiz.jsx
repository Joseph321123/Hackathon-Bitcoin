/**
 * Quiz.jsx — Página del quiz Bitcoin (ruta /quiz).
 *
 * Renderiza QuizGame; al finalizar se llama setQuizResult(score, true) para guardar la
 * puntuación y marcar el paso "Quiz" como completado en useProgress (barra de principiante).
 */
import { QuizGame } from '../components/QuizGame';
import { useProgress } from '../hooks/useProgress';

export function Quiz() {
  const { setQuizResult } = useProgress();

  const handleComplete = (finalScore) => {
    setQuizResult(finalScore ?? 0, true);
  };

  return (
    <div className="page page--quiz">
      <QuizGame onComplete={handleComplete} />
    </div>
  );
}
