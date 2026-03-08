import { useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { ProgressTracker } from './ProgressTracker';
import { ErrorBoundary } from './ErrorBoundary';
import { useProgress } from '../hooks/useProgress';
import './Layout.css';

const PRINCIPIANTES_PATHS = ['/', '/principiantes', '/learn', '/comprar', '/wallet-game', '/scam', '/enviar', '/quiz', '/mapa', '/felicitaciones'];

export function Layout({ darkMode, onToggleDark, children }) {
  const location = useLocation();
  const { progress, completedCount, totalSteps } = useProgress();
  const showProgress = PRINCIPIANTES_PATHS.includes(location.pathname);

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
