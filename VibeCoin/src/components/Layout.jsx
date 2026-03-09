/**
 * Layout.jsx — Envoltorio común de todas las páginas.
 *
 * Incluye:
 * - Enlace "Saltar al contenido" (accesibilidad).
 * - Header con Nav (logo, enlaces, botón tema) y, solo en rutas de principiante,
 *   la barra ProgressTracker (6 pasos + Master).
 * - Main con ErrorBoundary para capturar errores de React sin tumbar toda la app.
 * - Footer con texto fijo.
 *
 * La barra de progreso solo se muestra cuando la ruta actual está en PRINCIPIANTE_PATHS.
 */
import { useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { ProgressTracker } from './ProgressTracker';
import { ErrorBoundary } from './ErrorBoundary';
import { useProgress } from '../hooks/useProgress';
import './Layout.css';

/** Rutas en las que se muestra la barra de progreso de principiante (6 pasos + felicitaciones). */
const PRINCIPIANTE_PATHS = ['/principiante', '/learn', '/comprar', '/wallet-game', '/scam', '/enviar', '/quiz', '/felicitaciones'];

export function Layout({ darkMode, onToggleDark, children }) {
  const location = useLocation();
  const { progress, completedCount, totalSteps } = useProgress();
  const showProgress = PRINCIPIANTE_PATHS.includes(location.pathname);

  return (
    <div className="layout">
      <a href="#main-content" className="layout__skip">Saltar al contenido</a>
      <header className="layout__header">
        <Nav darkMode={darkMode} onToggleDark={onToggleDark} />
        {showProgress && (
          <ProgressTracker
            progress={progress}
            completedCount={completedCount}
            totalSteps={totalSteps}
          />
        )}
      </header>
      <main id="main-content" className="layout__main" tabIndex={-1}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <footer className="layout__footer">
        <p>VibeCoin — Aprende, practica y descubre Bitcoin. Sin fines de lucro, solo educación.</p>
      </footer>
    </div>
  );
}
