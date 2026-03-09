/**
 * Recursos.jsx — Página de recursos y documentación (ruta /recursos).
 *
 * Contenido por pestañas: Conceptos básicos (texto + BlockchainDiagram), Comprar y guardar
 * (exchanges y billeteras de ejemplo), Seguridad (checklist), Métricas avanzadas (explicación),
 * Ecosistema Bitcoin en México (tarjetas de MEXICO_ECOSYSTEM: Aureo Bitcoin, La Casa de Satoshi).
 * Debajo de las pestañas hay una sección fija de videos embebidos (YouTube).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlockchainDiagram } from '../components/BlockchainDiagram';
import { MEXICO_ECOSYSTEM } from '../data/mexicoEcosystem';
import './Recursos.css';

const TABS = [
  { id: 'conceptos', label: 'Conceptos básicos' },
  { id: 'comprar', label: 'Comprar y guardar' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'metricas', label: 'Métricas avanzadas' },
  { id: 'ecosistema-mexico', label: 'Ecosistema Bitcoin en México' },
];

const EXCHANGES = [
  { name: 'Bitso', region: 'México / Latam', note: 'Regulado, SPEI, tarjeta', url: 'https://bitso.com' },
  { name: 'Binance', region: 'Global', note: 'P2P, tarjeta, muchos pares', url: 'https://binance.com' },
  { name: 'Kraken', region: 'Global', note: 'Regulado, buena seguridad', url: 'https://kraken.com' },
];

const WALLETS = [
  { name: 'Bitcoin Core', type: 'Nodo completo', note: 'Máxima soberanía, requiere espacio' },
  { name: 'Electrum', type: 'Escritorio', note: 'Ligero, bueno para cold' },
  { name: 'Sparrow', type: 'Escritorio', note: 'Privacidad, multisig' },
  { name: 'Ledger / Trezor', type: 'Hardware', note: 'Custodia en dispositivo' },
];

const SECURITY_CHECKLIST = [
  { id: 'seed', label: 'Respaldar frase semilla (12/24 palabras)', detail: 'Guárdala en papel o metal, nunca en digital ni en la nube.' },
  { id: 'hardware', label: 'Considerar billetera de hardware', detail: 'Para cantidades importantes, un Ledger o Trezor reduce riesgo.' },
  { id: 'phishing', label: 'Cuidado con phishing y enlaces falsos', detail: 'Siempre verifica la URL y no hagas clic en correos sospechosos.' },
  { id: 'verify', label: 'Verificar direcciones antes de enviar', detail: 'Compara los primeros y últimos caracteres de la dirección.' },
];

export function Recursos() {
  const [activeTab, setActiveTab] = useState('conceptos');

  return (
    <div className="recursos recursos--tabs section-page">
      <header className="recursos__header">
        <h1 className="recursos__title">Recursos y documentación</h1>
        <p className="recursos__tagline">
          Documentación por temas, comparativas y checklist de seguridad. Todo en un solo lugar.
        </p>
      </header>

      <div className="recursos__tabs" role="tablist" aria-label="Temas de documentación">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            className={`recursos__tab ${activeTab === id ? 'recursos__tab--active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="recursos__panel" role="tabpanel">
        {activeTab === 'conceptos' && (
          <section className="recursos__content">
            <h2 className="recursos__content-title">Conceptos básicos</h2>
            <p className="recursos__content-intro">
              Bitcoin es una red descentralizada de dinero digital. Las transacciones se agrupan en <strong>bloques</strong> y se encadenan formando la <strong>blockchain</strong>. Así se garantiza que nadie pueda gastar dos veces lo mismo ni alterar el historial sin que la red lo detecte. El suministro está limitado a <strong>21 millones de BTC</strong> y la emisión nueva se reduce a la mitad cada ~4 años (<strong>halving</strong>), por lo que el modelo monetario es predecible y escaso.
            </p>
            <BlockchainDiagram />
            <p className="recursos__hint">
              Más contenido paso a paso en <Link to="/principiante" className="recursos__link">Principiante</Link> → Aprende lo básico.
            </p>
          </section>
        )}

        {activeTab === 'comprar' && (
          <section className="recursos__content">
            <h2 className="recursos__content-title">Comprar y guardar</h2>
            <p className="recursos__content-intro">
              Para comprar Bitcoin sueles usar un <strong>exchange</strong> (KYC, SPEI o tarjeta). Luego puedes dejarlo ahí o pasarlo a una <strong>billetera</strong> que tú controlas (custodio propio).
            </p>
            <h3 className="recursos__subtitle">Exchanges (ejemplos)</h3>
            <div className="recursos__cards">
              {EXCHANGES.map((e) => (
                <article key={e.name} className="recursos__card">
                  <h4 className="recursos__card-title">{e.name}</h4>
                  <p className="recursos__card-meta">{e.region}</p>
                  <p className="recursos__card-desc">{e.note}</p>
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="recursos__card-link">Ir al sitio →</a>
                </article>
              ))}
            </div>
            <h3 className="recursos__subtitle">Billeteras (ejemplos)</h3>
            <div className="recursos__cards">
              {WALLETS.map((w) => (
                <article key={w.name} className="recursos__card">
                  <h4 className="recursos__card-title">{w.name}</h4>
                  <p className="recursos__card-meta">{w.type}</p>
                  <p className="recursos__card-desc">{w.note}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'seguridad' && (
          <section className="recursos__content">
            <h2 className="recursos__content-title">Seguridad</h2>
            <p className="recursos__content-intro">
              Checklist interactivo: marca mentalmente cada punto para reforzar buenas prácticas.
            </p>
            <ul className="recursos__checklist">
              {SECURITY_CHECKLIST.map((item) => (
                <li key={item.id} className="recursos__checklist-item">
                  <span className="recursos__checklist-icon" aria-hidden>✓</span>
                  <div>
                    <strong className="recursos__checklist-label">{item.label}</strong>
                    <p className="recursos__checklist-detail">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="recursos__hint">
              Practica con el juego de frase semilla y el detector de estafas en <Link to="/principiante" className="recursos__link">Principiante</Link>.
            </p>
          </section>
        )}

        {activeTab === 'metricas' && (
          <section className="recursos__content">
            <h2 className="recursos__content-title">Métricas avanzadas</h2>
            <p className="recursos__content-intro">
              Direcciones activas, hashrate, supply en exchanges, long-term holders: son métricas on-chain que ayudan a entender la salud de la red y el comportamiento de los inversores.
            </p>
            <ul className="recursos__list">
              <li><strong>Direcciones activas</strong> — Cuántas direcciones envían/reciben en un día.</li>
              <li><strong>Hashrate</strong> — Poder de minado de la red (seguridad).</li>
              <li><strong>Supply en exchanges</strong> — Menos BTC en exchanges puede indicar acumulación.</li>
              <li><strong>LTH (Long-term holders)</strong> — Direcciones que no mueven BTC desde hace meses.</li>
            </ul>
            <p>
              <Link to="/noticias" className="recursos__link">En Noticias</Link> puedes ver hashrate, dificultad, mempool y más métricas en vivo.
            </p>
          </section>
        )}

        {activeTab === 'ecosistema-mexico' && (
          <section className="recursos__content">
            <h2 className="recursos__content-title">Ecosistema Bitcoin en México</h2>
            <p className="recursos__content-intro">
              Proyectos y espacios en México enfocados en Bitcoin: compra, educación y comunidad.
            </p>
            <div className="recursos__cards">
              {MEXICO_ECOSYSTEM.map((item) => (
                <article key={item.id} className="recursos__card">
                  <h4 className="recursos__card-title">{item.name}</h4>
                  <p className="recursos__card-desc">{item.description}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="recursos__card-link recursos__card-link--btn">
                    Visitar sitio
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="recursos__section recursos__videos" aria-labelledby="recursos-videos">
        <h2 id="recursos-videos" className="recursos__section-title">Videos (YouTube)</h2>
        <div className="recursos__video-grid">
          <article className="recursos__video-card">
            <h3 className="recursos__video-title">¿Qué es Bitcoin?</h3>
            <p className="recursos__video-channel">Kurzgesagt</p>
            <div className="recursos__video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/Gc2en3nHxA4"
                title="Qué es Bitcoin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="recursos__iframe"
              />
            </div>
          </article>
          <article className="recursos__video-card">
            <h3 className="recursos__video-title">Cómo funciona Bitcoin</h3>
            <p className="recursos__video-channel">Andreas Antonopoulos</p>
            <div className="recursos__video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/SSo_EIwHSd4"
                title="Cómo funciona Bitcoin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="recursos__iframe"
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
