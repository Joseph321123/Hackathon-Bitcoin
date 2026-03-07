import { ScamGame } from '../components/ScamGame';
import { useProgress } from '../hooks/useProgress';

export function ScamDetector() {
  const { markScamGameDone } = useProgress();

  return (
    <div className="page page--scam">
      <ScamGame onComplete={markScamGameDone} />
    </div>
  );
}
