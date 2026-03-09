/**
 * vite.config.js — Configuración de Vite para VibeCoin.
 *
 * - plugins: React (JSX, HMR).
 * - base: en local es '/'; en GitHub Actions se usa '/Hackathon-Bitcoin/' (nombre del repo).
 *   Puedes sobrescribir con VITE_BASE_URL. El base afecta a las rutas estáticas y al Router en producción.
 * - server.proxy: en desarrollo, /api-coingecko y /api-mempool se reescriben y redirigen a
 *   CoinGecko y mempool.space para evitar CORS desde el navegador.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || (process.env.GITHUB_ACTIONS ? '/Hackathon-Bitcoin/' : '/'),
  server: {
    proxy: {
      '/api-coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-coingecko/, ''),
      },
      '/api-mempool': {
        target: 'https://mempool.space',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-mempool/, ''),
      },
    },
  },
})
