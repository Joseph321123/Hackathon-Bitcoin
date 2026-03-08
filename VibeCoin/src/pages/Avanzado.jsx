import { Link } from 'react-router-dom';
import './Avanzado.css';

/**
 * Sección para usuarios con experiencia: juegos de estrategia, ecosistema e información avanzada.
 */
export function Avanzado() {
  return (
    <div className="avanzado section-page">
      <header className="avanzado__header">
        <h1 className="avanzado__title">Avanzado</h1>
        <p className="avanzado__tagline">
          Juegos de estrategia con Bitcoin, ecosistema e información para quienes ya conocen el tema.
        </p>
      </header>

      <section className="avanzado__section" aria-labelledby="avanzado-noticias-link">
        <h2 id="avanzado-noticias-link" className="avanzado__section-title">Noticias</h2>
        <p className="avanzado__intro">
          Las noticias y cambios recientes tienen su propia sección: <Link to="/noticias" className="avanzado__link">Ir a Noticias</Link>.
        </p>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-juegos">
        <h2 id="avanzado-juegos" className="avanzado__section-title">Bitcoin Strategy Games</h2>
        <p className="avanzado__intro">
          Juegos educativos con datos históricos reales: compra/vende mes a mes desde 2013 (Time Traveler) o adivina el precio al que cerró un período (Guess the Price). Incluyen comparación vs HODL y opción de compartir tu resultado.
        </p>
        <p>
          <Link to="/juegos-btc" className="avanzado__cta">Jugar ahora →</Link>
        </p>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-ecosistema">
        <h2 id="avanzado-ecosistema" className="avanzado__section-title">Ecosistema Bitcoin</h2>
        <ul className="avanzado__list">
          <li><strong>Lightning Network</strong> — Pagos instantáneos y comisiones muy bajas sobre Bitcoin.</li>
          <li><strong>Taproot</strong> — Actualización que mejora privacidad y permite contratos más complejos.</li>
          <li><strong>Ordinals e inscripciones</strong> — Datos almacenados en la blockchain (NFTs, tokens).</li>
          <li><strong>Sidechains y capas</strong> — RSK, Liquid y otras redes vinculadas a Bitcoin.</li>
        </ul>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-recursos">
        <h2 id="avanzado-recursos" className="avanzado__section-title">Dónde profundizar</h2>
        <p className="avanzado__intro">
          Para contenido más técnico y noticias al día, revisa la sección <Link to="/recursos" className="avanzado__link">Recursos</Link> (documentación, enlaces y videos). Aquí mantenemos un resumen orientado a usuarios con experiencia.
        </p>
      </section>
    </div>
  );
}
