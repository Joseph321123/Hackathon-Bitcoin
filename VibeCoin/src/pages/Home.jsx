import { Link } from 'react-router-dom';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';
import { useProgress } from '../hooks/useProgress';
import { formatMxn, formatPercent } from '../utils/formatters';
import { MxnBtcCalculator } from '../components/MxnBtcCalculator';
import { Achievements } from '../components/Achievements';
import './Home.css';

export function Home() {
  const { price, loading } = useBitcoinPrice();
  const { progress } = useProgress();

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">
          <span className="home__logo" aria-hidden>₿</span> VibeCoin
        </h1>
        <p className="home__tagline">
          Aprende, practica y descubre dónde usar Bitcoin — pensado para México y principiantes.
        </p>
        {!loading && (
          <div className="home__price" aria-live="polite">
            <span className="home__price-label">1 BTC ≈</span>
            <span className="home__price-value">{formatMxn(price.mxn)}</span>
            {price.change24h != null && (
              <span className={`home__price-change ${price.change24h >= 0 ? 'home__price-change--up' : 'home__price-change--down'}`}>
                {formatPercent(price.change24h)} 24h
              </span>
            )}
          </div>
        )}
      </section>

      <div className="home__guide" role="region" aria-label="Guía rápida">
        <p className="home__guide-title">¿Primera vez? Sigue estos 3 pasos:</p>
        <ol className="home__guide-steps">
          <li><strong>1. Aprende</strong> — Lee qué es Bitcoin y cómo funciona.</li>
          <li><strong>2. Practica</strong> — Usa los simuladores y juegos (compra, envío, estafas, frase semilla).</li>
          <li><strong>3. Explora</strong> — Ve el mapa y las marcas que aceptan Bitcoin (Tesla, Microsoft, etc.).</li>
        </ol>
      </div>

      <nav className="home__nav" aria-label="Módulos de aprendizaje">
        <h2 className="home__section-title">Empieza aquí</h2>
        <p className="home__nav-hint">Haz clic en cualquier tarjeta para entrar. No necesitas saber nada de tecnología.</p>
        <ul className="home__grid">
          <li>
            <Link to="/learn" className="home__card home__card--first">
              <span className="home__card-label">Aprende lo básico</span>
              <span className="home__card-desc">Qué es Bitcoin, blockchain y billeteras</span>
            </Link>
          </li>
          <li>
            <Link to="/comprar" className="home__card">
              <span className="home__card-label">Simulador de compra</span>
              <span className="home__card-desc">Convierte pesos (MXN) a Bitcoin con precio en vivo</span>
            </Link>
          </li>
          <li>
            <Link to="/wallet-game" className="home__card">
              <span className="home__card-label">Juego: frase semilla</span>
              <span className="home__card-desc">Ordena 12 palabras como en una billetera real</span>
            </Link>
          </li>
          <li>
            <Link to="/scam" className="home__card">
              <span className="home__card-label">¿Estafa o seguro?</span>
              <span className="home__card-desc">Aprende a reconocer estafas con ejemplos</span>
            </Link>
          </li>
          <li>
            <Link to="/enviar" className="home__card">
              <span className="home__card-label">Simulador de envío</span>
              <span className="home__card-desc">Practica los pasos para enviar Bitcoin</span>
            </Link>
          </li>
          <li>
            <Link to="/quiz" className="home__card">
              <span className="home__card-label">Quiz Bitcoin</span>
              <span className="home__card-desc">Preguntas con tiempo, tipo concurso</span>
            </Link>
          </li>
          <li>
            <Link to="/mapa" className="home__card">
              <span className="home__card-label">Dónde aceptan Bitcoin</span>
              <span className="home__card-desc">Tesla, Microsoft, Starbucks y más + mapa</span>
            </Link>
          </li>
        </ul>
      </nav>

      <MxnBtcCalculator />

      <section className="home__mexico">
        <h2 className="home__section-title">Bitcoin en México</h2>
        <p>
          Puedes comprar Bitcoin en exchanges regulados como <strong>Bitso</strong> con SPEI o tarjeta.
          Cada vez más negocios aceptan Bitcoin en el país. Usa el mapa para explorar ubicaciones y el simulador para practicar conversión MXN → BTC.
        </p>
        <ul className="home__mexico-list">
          <li><strong>Comprar:</strong> Bitso, Binance, etc. con SPEI o tarjeta.</li>
          <li><strong>Pagar:</strong> Busca comercios que acepten Bitcoin (mapa en esta app).</li>
          <li><strong>Seguridad:</strong> Nunca compartas tu frase de 12/24 palabras con nadie.</li>
        </ul>
      </section>

      <Achievements progress={progress} />
    </div>
  );
}
