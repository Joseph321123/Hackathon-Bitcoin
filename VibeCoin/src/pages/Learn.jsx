/**
 * Learn.jsx — Página "Aprende lo básico" (ruta /learn).
 *
 * Muestra el diagrama de blockchain y una grid de BitcoinCard con el contenido de learnCards
 * (qué es Bitcoin, por qué existe, blockchain, billeteras, seguridad). Al montar se llama
 * markLearnedBasics() para marcar el primer paso del progreso de principiante como completado.
 */
import { learnCards } from '../data/learnCards';
import { BitcoinCard } from '../components/BitcoinCard';
import { BlockchainDiagram } from '../components/BlockchainDiagram';
import { useProgress } from '../hooks/useProgress';
import { useEffect } from 'react';
import './Learn.css';

export function Learn() {
  const { markLearnedBasics } = useProgress();

  useEffect(() => {
    markLearnedBasics();
  }, [markLearnedBasics]);

  return (
    <div className="learn">
      <header className="learn__header">
        <h1>Aprende lo básico de Bitcoin</h1>
        <p>Conceptos precisos y en lenguaje sencillo. Sin bancos, sin intermediarios.</p>
      </header>

      <BlockchainDiagram />

      <div className="learn__grid">
        {learnCards.map((card) => (
          <BitcoinCard key={card.id} icon={card.icon} title={card.title}>
            <p>{card.content}</p>
          </BitcoinCard>
        ))}
      </div>
    </div>
  );
}
