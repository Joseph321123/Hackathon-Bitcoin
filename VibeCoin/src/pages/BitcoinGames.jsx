import { useState } from 'react';
import { TimeTravelerGame } from '../components/games/TimeTravelerGame';
import { GuessPriceGame } from '../components/games/GuessPriceGame';
import '../components/games/Games.css';
import './BitcoinGames.css';

const TABS = [
  { id: 'time', label: 'Bitcoin Time Traveler' },
  { id: 'guess', label: 'Adivina el precio' },
];

export function BitcoinGames() {
  const [activeTab, setActiveTab] = useState('time');
  const [shareLabel, setShareLabel] = useState('Compartir resultado');

  const handleShare = () => {
    const text = `¡Jugué Bitcoin Strategy Games en VibeCoin! 🎮₿\n\nModo: ${TABS.find((t) => t.id === activeTab)?.label ?? 'Bitcoin Games'}\n\n¿Te atreves a batir mi puntuación?`;
    if (navigator.share) {
      navigator.share({
        title: 'VibeCoin - Bitcoin Strategy Games',
        text,
        url: window.location.href,
      }).catch(() => copyAndShow(text));
    } else {
      copyAndShow(text);
    }
  };

  const copyAndShow = (text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setShareLabel('¡Copiado!');
      setTimeout(() => setShareLabel('Compartir resultado'), 2000);
    });
  };

  return (
    <div className="games-page section-page">
      <header className="games-page__header">
        <h1 className="games-page__title">Bitcoin Strategy Games</h1>
        <p className="games-page__tagline">
          Juegos educativos con datos históricos de Bitcoin: viaja en el tiempo comprando y vendiendo, o adivina el precio. Divertido y compartible.
        </p>
      </header>

      <div className="games-page__tabs" role="tablist" aria-label="Modos de juego">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            className={`games-page__tab ${activeTab === id ? 'games-page__tab--active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="games-page__content" role="tabpanel">
        {activeTab === 'time' && <TimeTravelerGame />}
        {activeTab === 'guess' && <GuessPriceGame />}
      </div>

      <section className="games-page__share" aria-labelledby="share-title">
        <h2 id="share-title" className="games-page__share-title">Compartir</h2>
        <p className="games-page__share-desc">
          Comparte tu resultado en redes sociales y reta a tus amigos.
        </p>
        <div className="games-page__share-card">
          ¡Jugué Bitcoin Strategy Games en VibeCoin! 🎮₿ — ¿Te atreves a batir mi puntuación?
        </div>
        <div className="games-page__share-actions">
          <button type="button" className="games-page__share-btn" onClick={handleShare}>
            {shareLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
