import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Para GitHub Pages: usa base con el nombre de tu repo. Ej: '/Hackathon-Bitcoin/'
export default defineConfig({
  plugins: [react()],
  // En GitHub Pages usa el nombre del repo. Ej: repo "VibeCoin" → base: '/VibeCoin/'
  base: process.env.VITE_BASE_URL || (process.env.GITHUB_ACTIONS ? '/VibeCoin/' : '/'),
})
