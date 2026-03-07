import { BitcoinMap } from '../components/BitcoinMap';
import { useProgress } from '../hooks/useProgress';

export function Map() {
  const { markVisitedMap } = useProgress();

  return (
    <div className="page page--map">
      <BitcoinMap onVisit={markVisitedMap} />
    </div>
  );
}
