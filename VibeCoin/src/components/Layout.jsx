import { Nav } from './Nav';
import { ProgressTracker } from './ProgressTracker';
import { ErrorBoundary } from './ErrorBoundary';
import { useProgress } from '../hooks/useProgress';
import './Layout.css';

export function Layout({ darkMode, onToggleDark, children }) {
  const { progress, completedCount, totalSteps } = useProgress();

  return (
    <div className="layout">
      <a href="#main-content" className="layout__skip">Saltar al contenido</a>
      <header className="layout__header">
        <Nav darkMode={darkMode} onToggleDark={onToggleDark} />
        <ProgressTracker
          progress={progress}
          completedCount={completedCount}
          totalSteps={totalSteps}
        />
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
