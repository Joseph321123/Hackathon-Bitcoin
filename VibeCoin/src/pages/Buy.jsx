import { BuySimulator } from '../components/BuySimulator';
import { useProgress } from '../hooks/useProgress';

export function Buy() {
  const { markBuySimDone } = useProgress();

  return (
    <div className="page page--buy">
      <BuySimulator onComplete={markBuySimDone} />
    </div>
  );
}
