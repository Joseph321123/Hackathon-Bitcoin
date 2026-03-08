import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/principiantes', label: 'Principiantes' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/avanzado', label: 'Avanzado' },
  { to: '/recursos', label: 'Recursos' },
];

export function Nav({ darkMode, onToggleDark }) {
  const location = useLocation();

  return (
    <nav className="nav" aria-label="Principal">
      <Link to="/" className="nav__brand">
        <span className="nav__logo" aria-hidden>₿</span>
        VibeCoin
      </Link>
      <ul className="nav__list">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`nav__link ${location.pathname === to ? 'nav__link--active' : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="nav__theme"
        onClick={onToggleDark}
        aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        title={darkMode ? 'Modo claro' : 'Modo oscuro'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
