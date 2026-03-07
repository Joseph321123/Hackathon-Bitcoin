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
