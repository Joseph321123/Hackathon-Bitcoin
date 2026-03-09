import { Link } from 'react-router-dom';
import { AdvancedDashboard } from '../components/AdvancedDashboard';
import './Avanzado.css';

/**
 * Sección avanzada: explicaciones visuales de juegos, dashboard Lightning/Mempool.
 */
export function Avanzado() {
  return (
    <div className="avanzado section-page">
      <header className="avanzado__header">
        <h1 className="avanzado__title">Avanzado</h1>
        <p className="avanzado__tagline">
          Juegos de estrategia con datos históricos reales y dashboards de red para quienes ya conocen Bitcoin.
        </p>
      </header>

      <section className="avanzado__section" aria-labelledby="avanzado-noticias-link">
        <h2 id="avanzado-noticias-link" className="avanzado__section-title">Noticias y métricas</h2>
        <p className="avanzado__intro">
          Métricas en vivo, feed de noticias y timeline de hitos: <Link to="/noticias" className="avanzado__link">Ir a Noticias</Link>.
        </p>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-juegos">
        <h2 id="avanzado-juegos" className="avanzado__section-title">Bitcoin Strategy Games</h2>

        <div className="avanzado__game-explain">
          <h3 className="avanzado__game-name">Bitcoin Time Traveler</h3>
          <p className="avanzado__game-desc">
            Empiezas en <strong>2013 con $1,000 USD</strong>. Cada mes avanzas en el tiempo y eliges: <strong>Comprar</strong> (inviertes parte en BTC), <strong>Vender</strong> (conviertes parte de tu BTC a USD) o <strong>Mantener</strong>. Ves la evolución del precio en un gráfico y al final comparas tu resultado con la estrategia <strong>HODL</strong> (comprar todo al inicio y no tocar).
          </p>
          <ul className="avanzado__game-steps">
            <li>Gráfico histórico mes a mes</li>
            <li>Portfolio en USD y BTC</li>
            <li>Comparación vs HODL al final</li>
            <li>Modo difícil: solo ves el pasado, no el futuro</li>
          </ul>
        </div>

        <div className="avanzado__game-explain">
          <h3 className="avanzado__game-name">Adivina el precio</h3>
          <p className="avanzado__game-desc">
            Se muestra un <strong>gráfico histórico</strong> de Bitcoin con la <strong>parte final oculta</strong>. Debes predecir a qué precio cerró ese período. Al enviar tu predicción se revela el precio real y se calcula tu error porcentual. Períodos aleatorios (alcistas, bajistas, laterales) para repetir partidas.
          </p>
          <ul className="avanzado__game-steps">
            <li>Chart con tramo visible y final oculto</li>
            <li>Introduces tu predicción en USD</li>
            <li>Revelación del precio real y % de error</li>
            <li>“Predicción perfecta” si aciertas muy cerca</li>
          </ul>
        </div>

        <p className="avanzado__cta-wrap">
          <Link to="/juegos-btc" className="avanzado__cta">Jugar ahora →</Link>
        </p>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-dashboard">
        <h2 id="avanzado-dashboard" className="avanzado__section-title">Dashboard avanzado</h2>
        <p className="avanzado__intro">
          Estadísticas de Lightning Network (nodos, canales, capacidad) y estado del Mempool (transacciones pendientes, comisiones recomendadas).
        </p>
        <AdvancedDashboard />
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-ecosistema">
        <h2 id="avanzado-ecosistema" className="avanzado__section-title">Ecosistema Bitcoin</h2>
        <ul className="avanzado__list">
          <li><strong>Lightning Network</strong> — Pagos instantáneos y comisiones muy bajas sobre Bitcoin.</li>
          <li><strong>Taproot</strong> — Mejora privacidad y permite contratos más complejos.</li>
          <li><strong>Ordinals e inscripciones</strong> — Datos en la blockchain (NFTs, tokens).</li>
          <li><strong>Sidechains y capas</strong> — RSK, Liquid y otras redes vinculadas a Bitcoin.</li>
        </ul>
      </section>

      <section className="avanzado__section" aria-labelledby="avanzado-recursos">
        <h2 id="avanzado-recursos" className="avanzado__section-title">Recursos</h2>
        <p className="avanzado__intro">
          Documentación por temas, enlaces y videos: <Link to="/recursos" className="avanzado__link">Ir a Recursos</Link>.
        </p>
      </section>
    </div>
  );
}
