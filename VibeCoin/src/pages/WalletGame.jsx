import { SeedPhraseGame } from '../components/SeedPhraseGame';
import { useProgress } from '../hooks/useProgress';

export function WalletGame() {
  const { markSeedGameDone } = useProgress();

  return (
    <div className="page page--wallet">
      <SeedPhraseGame onComplete={markSeedGameDone} />
    </div>
  );
}
