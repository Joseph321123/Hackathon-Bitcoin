import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Buy } from './pages/Buy';
import { WalletGame } from './pages/WalletGame';
import { ScamDetector } from './pages/ScamDetector';
import { Send } from './pages/Send';
import { Quiz } from './pages/Quiz';
import { NotFound } from './pages/NotFound';
import { Congratulations } from './pages/Congratulations';
import './App.css';

const MapPage = lazy(() => import('./pages/Map.jsx').then((m) => ({ default: m.Map })));

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('vibecoin-dark', false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // En local (base '/') usamos HashRouter para que la navegación funcione siempre.
  // En producción (GitHub Pages) usamos BrowserRouter con base.
  const isLocal = import.meta.env.BASE_URL === '/';
  const Router = isLocal ? HashRouter : BrowserRouter;
  const basename = isLocal ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

  const layoutProps = { darkMode, onToggleDark: () => setDarkMode((d) => !d) };

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Layout {...layoutProps}><Home /></Layout>} />
        <Route path="/learn" element={<Layout {...layoutProps}><Learn /></Layout>} />
        <Route path="/comprar" element={<Layout {...layoutProps}><Buy /></Layout>} />
        <Route path="/wallet-game" element={<Layout {...layoutProps}><WalletGame /></Layout>} />
        <Route path="/scam" element={<Layout {...layoutProps}><ScamDetector /></Layout>} />
        <Route path="/enviar" element={<Layout {...layoutProps}><Send /></Layout>} />
        <Route path="/quiz" element={<Layout {...layoutProps}><Quiz /></Layout>} />
        <Route path="/mapa" element={<Layout {...layoutProps}><Suspense fallback={<p className="page-loading">Cargando mapa…</p>}><MapPage /></Suspense></Layout>} />
        <Route path="/felicitaciones" element={<Layout {...layoutProps}><Congratulations /></Layout>} />
        <Route path="*" element={<Layout {...layoutProps}><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}
