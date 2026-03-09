/**
 * App.jsx — Raíz de la aplicación VibeCoin.
 *
 * Responsabilidades:
 * - Persistir y aplicar tema claro/oscuro (localStorage clave 'vibecoin-dark').
 * - Elegir Router: HashRouter en local (URLs con #) para no depender de servidor;
 *   BrowserRouter en producción cuando hay base path (p. ej. GitHub Pages).
 * - Definir todas las rutas y envolver cada una con Layout (nav, progreso, footer).
 */
import { useEffect } from 'react';
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
import { Principiantes } from './pages/Principiantes';
import { Avanzado } from './pages/Avanzado';
import { Recursos } from './pages/Recursos';
import { Noticias } from './pages/Noticias';
import { BitcoinGames } from './pages/BitcoinGames';
import { EcosistemaMapa } from './pages/EcosistemaMapa';
import './App.css';

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('vibecoin-dark', false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // En local (base '/') usamos HashRouter para que la navegación funcione sin configurar servidor.
  // En producción (GitHub Pages con base tipo '/VibeCoin/') usamos BrowserRouter con basename.
  const isLocal = import.meta.env.BASE_URL === '/';
  const Router = isLocal ? HashRouter : BrowserRouter;
  const basename = isLocal ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

  const layoutProps = { darkMode, onToggleDark: () => setDarkMode((d) => !d) };

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Layout {...layoutProps}><Home /></Layout>} />
        <Route path="/principiante" element={<Layout {...layoutProps}><Principiantes /></Layout>} />
        <Route path="/principiantes" element={<Layout {...layoutProps}><Principiantes /></Layout>} />
        <Route path="/noticias" element={<Layout {...layoutProps}><Noticias /></Layout>} />
        <Route path="/avanzado" element={<Layout {...layoutProps}><Avanzado /></Layout>} />
        <Route path="/mapa" element={<Layout {...layoutProps}><EcosistemaMapa /></Layout>} />
        <Route path="/juegos-btc" element={<Layout {...layoutProps}><BitcoinGames /></Layout>} />
        <Route path="/recursos" element={<Layout {...layoutProps}><Recursos /></Layout>} />
        <Route path="/learn" element={<Layout {...layoutProps}><Learn /></Layout>} />
        <Route path="/comprar" element={<Layout {...layoutProps}><Buy /></Layout>} />
        <Route path="/wallet-game" element={<Layout {...layoutProps}><WalletGame /></Layout>} />
        <Route path="/scam" element={<Layout {...layoutProps}><ScamDetector /></Layout>} />
        <Route path="/enviar" element={<Layout {...layoutProps}><Send /></Layout>} />
        <Route path="/quiz" element={<Layout {...layoutProps}><Quiz /></Layout>} />
        <Route path="/felicitaciones" element={<Layout {...layoutProps}><Congratulations /></Layout>} />
        <Route path="*" element={<Layout {...layoutProps}><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}
