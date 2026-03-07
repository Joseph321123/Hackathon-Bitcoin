import { useState } from 'react';
import './BlockchainDiagram.css';

/**
 * Diagrama interactivo: bloques encadenados. Al hacer clic se explica cada parte.
 */
const BLOCKS = [
  { id: 1, txCount: 3, label: 'Bloque 1' },
  { id: 2, txCount: 5, label: 'Bloque 2' },
  { id: 3, txCount: 4, label: 'Bloque 3' },
  { id: 4, txCount: 6, label: 'Bloque 4' },
  { id: 5, txCount: 2, label: 'Bloque 5' },
];

const EXPLANATIONS = {
  1: 'Cada bloque agrupa transacciones recientes. Una vez validado por los mineros, se añade a la cadena.',
  2: 'Los bloques se encadenan con un "hash" que depende del anterior. Cambiar uno rompería la cadena.',
  3: 'Miles de nodos en el mundo guardan una copia. La red acuerda cuál es la cadena válida (consenso).',
  4: 'Cualquier persona puede verificar las transacciones. No hace falta confiar en un banco central.',
  5: 'Por eso Bitcoin es "descentralizado": no hay un solo servidor ni empresa que lo controle.',
};

export function BlockchainDiagram() {
  const [activeBlock, setActiveBlock] = useState(null);

  return (
    <section className="blockchain-diagram" aria-labelledby="diagram-title">
      <h2 id="diagram-title" className="blockchain-diagram__title">Así se encadena la blockchain</h2>
      <p className="blockchain-diagram__intro">
        Haz clic en un bloque o en el enlace para ver qué representa.
      </p>

      <div className="blockchain-diagram__chain">
        {BLOCKS.map((block, i) => (
          <div key={block.id} className="blockchain-diagram__wrap">
            <button
              type="button"
              className={`blockchain-diagram__block ${activeBlock === block.id ? 'blockchain-diagram__block--active' : ''}`}
              onClick={() => setActiveBlock(activeBlock === block.id ? null : block.id)}
              aria-pressed={activeBlock === block.id}
              aria-label={`${block.label}, ${block.txCount} transacciones`}
            >
              <span className="blockchain-diagram__block-label">{block.label}</span>
              <span className="blockchain-diagram__block-txs">~{block.txCount} tx</span>
            </button>
            {i < BLOCKS.length - 1 && (
              <span className="blockchain-diagram__arrow" aria-hidden>→</span>
            )}
          </div>
        ))}
      </div>

      <div className="blockchain-diagram__legend">
        {activeBlock !== null && EXPLANATIONS[activeBlock] && (
          <p className="blockchain-diagram__explanation" role="status">
            {EXPLANATIONS[activeBlock]}
          </p>
        )}
        {activeBlock === null && (
          <p className="blockchain-diagram__hint">Haz clic en un bloque para ver la explicación.</p>
        )}
      </div>
    </section>
  );
}
