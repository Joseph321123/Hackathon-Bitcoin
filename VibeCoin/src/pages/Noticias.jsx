import './Noticias.css';

/**
 * Sección aparte: noticias y cambios recientes del ecosistema Bitcoin.
 */
export function Noticias() {
  return (
    <div className="noticias section-page">
      <header className="noticias__header">
        <h1 className="noticias__title">Noticias</h1>
        <p className="noticias__tagline">
          Actualizaciones del ecosistema Bitcoin, adopción, regulación y mercado. Fuentes recomendadas y temas a seguir.
        </p>
      </header>

      <section className="noticias__section" aria-labelledby="noticias-temas">
        <h2 id="noticias-temas" className="noticias__section-title">Temas a seguir</h2>
        <div className="noticias__grid">
          <article className="noticias__card">
            <h3 className="noticias__card-title">Adopción y regulación</h3>
            <p className="noticias__card-text">
              ETFs, adopción institucional, regulación en México (Ley Crypto) y Latinoamérica.
              Fuentes: CoinDesk, Bitcoin Magazine, Bitso Blog.
            </p>
          </article>
          <article className="noticias__card">
            <h3 className="noticias__card-title">Red y protocolo</h3>
            <p className="noticias__card-text">
              Halving, dificultad, Lightning Network y mejoras de protocolo (Taproot, etc.).
            </p>
          </article>
          <article className="noticias__card">
            <h3 className="noticias__card-title">Mercado y métricas</h3>
            <p className="noticias__card-text">
              Precio, dominancia, hashrate, direcciones activas y métricas on-chain.
            </p>
          </article>
        </div>
      </section>

      <section className="noticias__section" aria-labelledby="noticias-fuentes">
        <h2 id="noticias-fuentes" className="noticias__section-title">Fuentes recomendadas</h2>
        <ul className="noticias__list">
          <li><a href="https://www.coindesk.com" target="_blank" rel="noopener noreferrer" className="noticias__link">CoinDesk</a> — Noticias y análisis</li>
          <li><a href="https://bitcoinmagazine.com" target="_blank" rel="noopener noreferrer" className="noticias__link">Bitcoin Magazine</a> — Cultura y tecnología Bitcoin</li>
          <li><a href="https://blog.bitso.com" target="_blank" rel="noopener noreferrer" className="noticias__link">Bitso Blog</a> — Perspectiva desde México y Latam</li>
        </ul>
      </section>
    </div>
  );
}
