import { useState, useMemo } from 'react';
import { BitcoinCard } from './BitcoinCard';
import './SeedPhraseGame.css';

const SAMPLE_WORDS = ['gato', 'casa', 'sol', 'agua', 'luz', 'flor', 'pan', 'mar', 'rey', 'sal', 'red', 'uno'];

/**
 * Juego: ordenar la frase semilla. Al verificar se da feedback claro y opción de ver el orden correcto.
 */
export function SeedPhraseGame({ onComplete }) {
  const [shuffled, setShuffled] = useState([]);
  const [selected, setSelected] = useState([]);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState(null);
  const [showCorrectOrder, setShowCorrectOrder] = useState(false);

  const correctOrder = useMemo(() => [...SAMPLE_WORDS], []);

  const startGame = () => {
    setStarted(true);
    setShuffled([...SAMPLE_WORDS].sort(() => Math.random() - 0.5));
    setSelected([]);
    setWon(false);
    setVerifyMessage(null);
    setShowCorrectOrder(false);
  };

  const pickWord = (word, index) => {
    if (won) return;
    const fromShuffled = [...shuffled];
    fromShuffled.splice(index, 1);
    setShuffled(fromShuffled);
    setSelected([...selected, word]);
    setVerifyMessage(null);
  };

  const putBack = (word, index) => {
    if (won) return;
    const fromSelected = [...selected];
    fromSelected.splice(index, 1);
    setSelected(fromSelected);
    setShuffled([...shuffled, word].sort(() => Math.random() - 0.5));
    setVerifyMessage(null);
  };

  const checkOrder = () => {
    if (selected.length !== correctOrder.length) return;
    const correct = selected.every((w, i) => w === correctOrder[i]);
    if (correct) {
      setWon(true);
      setVerifyMessage(null);
      onComplete?.();
    } else {
      setVerifyMessage('wrong');
    }
  };

  const canCheck = selected.length === correctOrder.length;

  return (
    <div className="seed-game">
      <BitcoinCard title="Juego: Ordena tu frase semilla" icon="👛">
        <p>Tu billetera se respalda con 12 o 24 palabras en un orden exacto. Aquí practicas con 12 palabras de ejemplo: <strong>elige en el orden correcto</strong> (gato, casa, sol, agua, luz, flor, pan, mar, rey, sal, red, uno). Si te equivocas, puedes ver el orden y reintentar.</p>
      </BitcoinCard>

      {!started ? (
        <div className="seed-game__start">
          <p>Verás 12 palabras desordenadas. Haz clic en cada palabra <strong>en el orden correcto</strong> para formar la frase. Si no lo recuerdas, después de verificar podrás ver la solución.</p>
          <button type="button" className="btn btn--primary seed-game__btn-start" onClick={startGame}>
            Empezar juego
          </button>
        </div>
      ) : (
        <>
          <div className="seed-game__shuffled">
            <p className="seed-game__label">Palabras disponibles (haz clic en el orden correcto):</p>
            <div className="seed-game__words">
              {shuffled.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  type="button"
                  className="seed-game__word"
                  onClick={() => pickWord(word, i)}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          <div className="seed-game__selected">
            <p className="seed-game__label">Tu secuencia (haz clic en una para devolverla):</p>
            <div className="seed-game__words seed-game__words--selected">
              {selected.map((word, i) => (
                <button
                  key={`s-${word}-${i}`}
                  type="button"
                  className="seed-game__word seed-game__word--selected"
                  onClick={() => putBack(word, i)}
                >
                  <span className="seed-game__num">{i + 1}.</span> {word}
                </button>
              ))}
            </div>
          </div>

          {verifyMessage === 'wrong' && (
            <div className="seed-game__result seed-game__result--wrong" role="alert">
              <p>El orden no es correcto. La frase semilla tiene un orden único.</p>
              {!showCorrectOrder ? (
                <button type="button" className="btn btn--secondary" onClick={() => setShowCorrectOrder(true)}>
                  Ver orden correcto
                </button>
              ) : (
                <p className="seed-game__correct-order">
                  Orden correcto: <strong>{correctOrder.join(' → ')}</strong>
                </p>
              )}
            </div>
          )}

          {won && (
            <div className="seed-game__result seed-game__result--win" role="alert">
              <p className="seed-game__win-title">¡Orden correcto!</p>
              <p>En la vida real, guarda tu frase semilla en papel y nunca la compartas con nadie.</p>
            </div>
          )}

          <div className="seed-game__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={checkOrder}
              disabled={!canCheck}
            >
              Verificar orden
            </button>
            <button type="button" className="btn btn--secondary" onClick={startGame}>
              Reiniciar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
