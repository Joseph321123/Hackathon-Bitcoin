/**
 * Home.jsx — Página de inicio (landing) de VibeCoin.
 *
 * Secciones en orden: hero (título, intro, lista de qué puedes hacer, México/SPEI/Aureo/Bitso),
 * propiedades clave de Bitcoin (grid 3), tarjetas de navegación a Principiante/Avanzado/Mapa/Noticias/Recursos,
 * resumen de mercado (precio, cambio 24h, cap, dominancia), gráfico de precio 30 días (MiniBtcChart),
 * "¿Para qué se usa Bitcoin?" (4 tarjetas + nota México), dato curioso destacado,
 * "¿Por qué aprender Bitcoin?" (4 puntos) y calculadora MXN/BTC (MxnBtcCalculator).
 */
import { Link } from 'react-router-dom';
import { useBtcMarketOverview } from '../hooks/useBtcMarketOverview';
import { MxnBtcCalculator } from '../components/MxnBtcCalculator';
import { MiniBtcChart } from '../components/MiniBtcChart';
import './Home.css';

function formatUSD(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function formatPercent(n) {
  if (n == null) return '—';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

const NAV_CARDS = [
  { to: '/principiante', label: 'Principiante', desc: 'Aprende desde cero con guías y simuladores.' },
  { to: '/avanzado', label: 'Avanzado', desc: 'Juegos de estrategia y dashboards avanzados.' },
  { to: '/mapa', label: 'Mapa', desc: 'Empresas globales y mapa interactivo.' },
  { to: '/noticias', label: 'Noticias', desc: 'Métricas en vivo y feed de noticias.' },
  { to: '/recursos', label: 'Recursos', desc: 'Documentación y herramientas.' },
];

const PROPIEDADES_CLAVE = [
  { title: 'Descentralizado', desc: 'La red funciona en miles de nodos alrededor del mundo.' },
  { title: 'Oferta limitada', desc: 'Solo existirán 21 millones de BTC.' },
  { title: 'Transparente', desc: 'Cualquiera puede verificar transacciones en la blockchain.' },
];

const USE_CASES = [
  { title: 'Enviar dinero internacional', desc: 'Envía valor a cualquier parte del mundo sin bancos.' },
  { title: 'Proteger ahorros contra inflación', desc: 'Bitcoin tiene oferta limitada y puede usarse como reserva de valor a largo plazo.' },
  { title: 'Pagos en internet', desc: 'Algunos servicios y negocios aceptan pagos en Bitcoin.' },
  { title: 'Autocustodia', desc: 'Puedes controlar tu propio dinero con billeteras Bitcoin.' },
];

const WHY_LEARN = [
  { point: 'No depende de gobiernos', detail: 'Bitcoin funciona en una red descentralizada.' },
  { point: 'Cualquiera puede usarlo', detail: 'Solo necesitas internet y una billetera.' },
  { point: 'Oferta limitada', detail: 'Solo existirán 21 millones de BTC.' },
  { point: 'Funciona globalmente', detail: 'Puedes enviar valor a cualquier parte del mundo.' },
];

export function Home() {
  const { data: market, loading } = useBtcMarketOverview();

  return (
    <div className="home home--dashboard">
      <section className="home__hero">
        <h1 className="home__title">
          <span className="home__logo" aria-hidden>₿</span> VibeCoin
        </h1>
        <p className="home__tagline">
          Bitcoin es dinero digital descentralizado: funciona sin bancos ni intermediarios.
        </p>
        <p className="home__intro-list-title">En esta plataforma puedes:</p>
        <ul className="home__intro-list home__intro-list--bullets">
          <li>aprender cómo funciona Bitcoin</li>
          <li>practicar con simuladores interactivos</li>
          <li>explorar el ecosistema Bitcoin</li>
        </ul>
        <p className="home__mexico-badge">Pensado para usuarios en México.</p>
        <p className="home__intro-mexico">
          En México existen plataformas donde puedes comprar Bitcoin con pesos mediante transferencias SPEI.
          Ejemplos incluyen: <strong>Aureo Bitcoin</strong> y <strong>Bitso</strong>.
        </p>

        <div className="home__propiedades" aria-labelledby="propiedades-title">
          <h2 id="propiedades-title" className="home__propiedades-title">Propiedades clave de Bitcoin</h2>
          <div className="home__propiedades-grid">
            {PROPIEDADES_CLAVE.map((p) => (
              <div key={p.title} className="home__propiedad-card">
                <h3 className="home__propiedad-title">{p.title}</h3>
                <p className="home__propiedad-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="home__nav-cards" aria-label="Secciones principales">
        <h2 className="home__sr-only">Explorar</h2>
        <ul className="home__cards-grid">
          {NAV_CARDS.map(({ to, label, desc }) => (
            <li key={to}>
              <Link to={to} className="home__nav-card">
                <span className="home__nav-card-label">{label}</span>
                <span className="home__nav-card-desc">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="home__market" aria-labelledby="market-title">
        <h2 id="market-title" className="home__market-title">Mercado Bitcoin</h2>
        {loading ? (
          <p className="home__market-loading">Cargando datos…</p>
        ) : (
          <div className="home__market-grid">
            <div className="home__metric-card">
              <span className="home__metric-label">Precio (USD)</span>
              <span className="home__metric-value">{formatUSD(market.priceUsd)}</span>
            </div>
            <div className="home__metric-card">
              <span className="home__metric-label">Cambio 24h</span>
              <span className={`home__metric-value home__metric-value--${market.change24h >= 0 ? 'up' : 'down'}`}>
                {formatPercent(market.change24h)}
              </span>
            </div>
            <div className="home__metric-card">
              <span className="home__metric-label">Capitalización</span>
              <span className="home__metric-value">{formatUSD(market.marketCap)}</span>
            </div>
            <div className="home__metric-card">
              <span className="home__metric-label">Dominancia</span>
              <span className="home__metric-value">{market.dominance ? `${market.dominance.toFixed(1)}%` : '—'}</span>
            </div>
          </div>
        )}
      </section>

      <section className="home__chart-section" aria-labelledby="chart-title">
        <h2 id="chart-title" className="home__section-title">Precio de Bitcoin (30 días)</h2>
        <MiniBtcChart />
      </section>

      <section className="home__use-cases" aria-labelledby="use-cases-title">
        <h2 id="use-cases-title" className="home__section-title">¿Para qué se usa Bitcoin?</h2>
        <div className="home__use-cases-grid">
          {USE_CASES.map((u) => (
            <article key={u.title} className="home__use-case-card">
              <h3 className="home__use-case-title">{u.title}</h3>
              <p className="home__use-case-desc">{u.desc}</p>
            </article>
          ))}
        </div>
        <p className="home__use-cases-note">
          En México hay plataformas donde puedes comprar Bitcoin con pesos. Por ejemplo: <strong>Aureo Bitcoin</strong> (enfocada en servicios solo Bitcoin y asesoría personalizada) y <strong>Bitso</strong> (exchange muy usado en México con depósitos SPEI). Puedes comprar Bitcoin con pesos mexicanos mediante transferencias bancarias como SPEI.
        </p>
      </section>

      <section className="home__fun-fact" aria-labelledby="fun-fact-title">
        <h2 id="fun-fact-title" className="home__sr-only">Dato curioso</h2>
        <div className="home__fun-fact-card">
          <span className="home__fun-fact-icon" aria-hidden>💡</span>
          <p className="home__fun-fact-label">Dato curioso</p>
          <p className="home__fun-fact-text">
            Si hubieras comprado $100 USD de Bitcoin en 2013, hoy valdrían más de $1,000,000 MXN.
          </p>
          <span className="home__fun-fact-btc" aria-hidden>₿</span>
        </div>
      </section>

      <section className="home__why-learn" aria-labelledby="why-learn-title">
        <h2 id="why-learn-title" className="home__section-title">¿Por qué aprender Bitcoin?</h2>
        <div className="home__why-learn-grid">
          {WHY_LEARN.map((w) => (
            <div key={w.point} className="home__why-learn-item">
              <span className="home__why-learn-bullet" aria-hidden>•</span>
              <div>
                <strong className="home__why-learn-point">{w.point}</strong>
                <p className="home__why-learn-detail">{w.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MxnBtcCalculator />
    </div>
  );
}
