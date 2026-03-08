import { Link } from 'react-router-dom';
import './Principiantes.css';

const modules = [
  {
    to: '/learn',
    label: 'Aprende lo básico',
    desc: 'Qué es Bitcoin, blockchain y billeteras en lenguaje sencillo.',
  },
  {
    to: '/comprar',
    label: 'Simulador de compra',
    desc: 'Convierte pesos (MXN) a Bitcoin con precio en vivo.',
  },
  {
    to: '/wallet-game',
    label: 'Juego: frase semilla',
    desc: 'Ordena 12 palabras como en una billetera real.',
  },
  {
    to: '/scam',
    label: '¿Estafa o seguro?',
    desc: 'Aprende a reconocer estafas con ejemplos.',
  },
  {
    to: '/enviar',
    label: 'Simulador de envío',
    desc: 'Practica los pasos para enviar Bitcoin.',
  },
  {
    to: '/quiz',
    label: 'Quiz Bitcoin',
    desc: 'Preguntas con tiempo para reforzar lo aprendido.',
  },
  {
    to: '/mapa',
    label: 'Dónde aceptan Bitcoin',
    desc: 'Tesla, Microsoft, Starbucks y más + mapa interactivo.',
  },
];

/**
 * Sección para principiantes: guías, conceptos y primeros pasos.
 */
export function Principiantes() {
  return (
    <div className="principiantes section-page">
      <header className="principiantes__header">
        <h1 className="principiantes__title">Principiantes</h1>
        <p className="principiantes__tagline">
          Todo lo que necesitas para empezar: conceptos básicos, guías paso a paso y simuladores para practicar sin riesgo.
        </p>
      </header>

      <section className="principiantes__guide" aria-labelledby="principiantes-pasos">
        <h2 id="principiantes-pasos" className="principiantes__section-title">Ruta recomendada</h2>
        <ol className="principiantes__steps">
          <li><strong>Conceptos</strong> — Lee qué es Bitcoin y cómo funciona (Aprende lo básico).</li>
          <li><strong>Comprar y guardar</strong> — Practica con el simulador de compra y el juego de la frase semilla.</li>
          <li><strong>Seguridad</strong> — Revisa estafas comunes y el simulador de envío.</li>
          <li><strong>Practicar</strong> — Haz el quiz y explora el mapa de negocios.</li>
        </ol>
      </section>

      <nav className="principiantes__nav" aria-label="Módulos para principiantes">
        <h2 className="principiantes__section-title">Contenido para empezar</h2>
        <p className="principiantes__hint">Elige un tema. No necesitas conocimientos previos.</p>
        <ul className="principiantes__grid">
          {modules.map(({ to, label, desc }) => (
            <li key={to}>
              <Link to={to} className={`principiantes__card ${to === '/learn' ? 'principiantes__card--first' : ''}`}>
                <span className="principiantes__card-label">{label}</span>
                <span className="principiantes__card-desc">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
