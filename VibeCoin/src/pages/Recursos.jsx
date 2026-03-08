import { Link } from 'react-router-dom';
import './Recursos.css';

const docTopics = [
  { id: 'basicos', title: 'Conceptos básicos', desc: 'Qué es Bitcoin, blockchain, billeteras y direcciones.' },
  { id: 'comprar', title: 'Comprar y guardar', desc: 'Exchanges, KYC, frase semilla y buenas prácticas.' },
  { id: 'seguridad', title: 'Seguridad y estafas', desc: 'Cómo evitar phishing, fraudes y proteger tus fondos.' },
  { id: 'avanzado', title: 'Temas avanzados', desc: 'Lightning, Taproot, métricas on-chain y desarrollo.' },
];

const usefulLinks = [
  { href: 'https://bitcoin.org/es/', label: 'Bitcoin.org (oficial)', desc: 'Información y billeteras recomendadas' },
  { href: 'https://bitso.com', label: 'Bitso', desc: 'Exchange regulado en México' },
  { href: 'https://mempool.space', label: 'mempool.space', desc: 'Explorador de bloques y comisiones' },
  { href: 'https://bitcoiner.guide', label: 'Bitcoiner Guide', desc: 'Guías y recursos en varios idiomas' },
];

const videos = [
  {
    id: 'intro',
    title: '¿Qué es Bitcoin? (explicación sencilla)',
    embedId: 'Gc2en3nHxA4',
    channel: 'En pocas palabras – Kurzgesagt',
  },
  {
    id: 'how-it-works',
    title: 'Cómo funciona Bitcoin',
    embedId: 'SSo_EIwHSd4',
    channel: 'Andreas Antonopoulos',
  },
];

/**
 * Sección de recursos: documentación, enlaces y videos embebidos.
 */
export function Recursos() {
  return (
    <div className="recursos section-page">
      <header className="recursos__header">
        <h1 className="recursos__title">Recursos y documentación</h1>
        <p className="recursos__tagline">
          Documentación por temas, enlaces útiles y videos para seguir aprendiendo. Todo en un solo lugar.
        </p>
      </header>

      <section className="recursos__section" aria-labelledby="recursos-docs">
        <h2 id="recursos-docs" className="recursos__section-title">Documentación por temas</h2>
        <ul className="recursos__topic-list">
          {docTopics.map(({ id, title, desc }) => (
            <li key={id} className="recursos__topic">
              <h3 className="recursos__topic-title">{title}</h3>
              <p className="recursos__topic-desc">{desc}</p>
            </li>
          ))}
        </ul>
        <p className="recursos__hint">
          El contenido detallado de cada tema está en la sección <Link to="/principiantes" className="recursos__link">Principiantes</Link> (guías paso a paso y simuladores).
        </p>
      </section>

      <section className="recursos__section" aria-labelledby="recursos-enlaces">
        <h2 id="recursos-enlaces" className="recursos__section-title">Enlaces útiles</h2>
        <ul className="recursos__links">
          {usefulLinks.map(({ href, label, desc }) => (
            <li key={href} className="recursos__link-item">
              <a href={href} target="_blank" rel="noopener noreferrer" className="recursos__link-external">
                {label}
              </a>
              <span className="recursos__link-desc"> — {desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="recursos__section recursos__videos" aria-labelledby="recursos-videos">
        <h2 id="recursos-videos" className="recursos__section-title">Videos (YouTube)</h2>
        <p className="recursos__intro">Puedes ver los videos directamente aquí sin salir de la página.</p>
        <div className="recursos__video-grid">
          {videos.map(({ id, title, embedId, channel }) => (
            <article key={id} className="recursos__video-card">
              <h3 className="recursos__video-title">{title}</h3>
              <p className="recursos__video-channel">{channel}</p>
              <div className="recursos__video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${embedId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="recursos__iframe"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
