import { SendSimulator } from '../components/SendSimulator';
import { useProgress } from '../hooks/useProgress';

export function Send() {
  const { markSendSimDone } = useProgress();

  return (
    <div className="page page--send">
      <SendSimulator onComplete={markSendSimDone} />
    </div>
  );
}
