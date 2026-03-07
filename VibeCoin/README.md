# VibeCoin

Plataforma educativa e interactiva para aprender, practicar y descubrir dónde usar **Bitcoin**, con foco en México y principiantes.

Construida con **React + Vite** para el hackathon de educación Bitcoin.

---

## Características

- **Aprende lo básico**: qué es Bitcoin, por qué existe, blockchain, billeteras y seguridad.
- **Simulador de compra**: convierte MXN → BTC con precio en tiempo real (CoinGecko).
- **Juego de frase semilla**: ordena palabras desordenadas para entender el respaldo de la wallet.
- **¿Estafa o seguro?**: juego de tarjetas para reconocer estafas y prácticas seguras.
- **Simulador de envío**: pasos de una transacción (dirección, monto, comisión).
- **Quiz tipo Kahoot**: preguntas de opción múltiple con temporizador y puntuación.
- **Mapa global**: negocios que aceptan Bitcoin (OpenStreetMap + BTC Map / datos de ejemplo).
- **Progreso y modo oscuro**: seguimiento de pasos completados y tema claro/oscuro.

---

## Requisitos

- Node.js 18+
- npm o yarn

---

## Instalación y desarrollo

```bash
# Clonar (o abrir el proyecto)
cd VibeCoin

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). En local la app usa **HashRouter** (URLs con `#/`, p. ej. `#/learn`, `#/mapa`) para que la navegación funcione sin configuración extra.

---

## Build para producción

```bash
npm run build
```

La salida queda en la carpeta `dist/`.

---

## Despliegue en GitHub Pages

### 1. Configurar `base` en Vite

En `vite.config.js` el `base` debe coincidir con el nombre de tu repositorio en GitHub. Por defecto está `'/VibeCoin/'` cuando se despliega con GitHub Actions. Si tu repo tiene otro nombre (p. ej. `Hackathon-Bitcoin`), cambia en `vite.config.js`:

```js
base: process.env.VITE_BASE_URL || (process.env.GITHUB_ACTIONS ? '/Hackathon-Bitcoin/' : '/'),
```

En local (`npm run dev`) se usa siempre `base: '/'` y **HashRouter**, así que no necesitas tocar nada para desarrollar.

### 2. Opción A: GitHub Actions (recomendado)

Crea en la raíz del repo el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: VibeCoin/package-lock.json
      - name: Install and build
        run: |
          cd VibeCoin
          npm ci
          npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: VibeCoin/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Ajusta `cache-dependency-path` y `path` si tu proyecto **no** está en la subcarpeta `VibeCoin` (por ejemplo si está en la raíz, usa `./package-lock.json` y `./dist`).

Luego en GitHub:

1. Repositorio → **Settings** → **Pages**
2. En **Source** elige **GitHub Actions**
3. Haz push a `main`; el workflow construirá y desplegará la app.

La URL quedará: `https://<tu-usuario>.github.io/<nombre-repo>/`.

### 3. Opción B: Build local y subir `dist`

Si prefieres no usar Actions:

1. En `vite.config.js` pon `base: '/<nombre-repo>/'` (mismo nombre que el repo).
2. Ejecuta `npm run build` dentro de `VibeCoin`.
3. En **Settings → Pages**, en **Source** elige la rama `gh-pages` y la carpeta `/ (root)` o crea una rama `gh-pages`, copia el contenido de `dist` a la raíz de esa rama y sube.

Recomendación: usar la **Opción A** para que cada push a `main` actualice la página automáticamente.

---

## Estructura del proyecto

```
VibeCoin/
├── src/
│   ├── components/    # BitcoinCard, BuySimulator, SeedPhraseGame, ScamGame, QuizGame, BitcoinMap, ProgressTracker, Layout, Nav
│   ├── pages/         # Home, Learn, Buy, WalletGame, ScamDetector, Send, Quiz, Map
│   ├── hooks/         # useBitcoinPrice, useLocalStorage, useProgress
│   ├── services/      # api.js (CoinGecko, BTC Map)
│   ├── data/          # learnCards, scamData, quizData, mapLocations
│   ├── utils/         # formatters
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## APIs utilizadas

- **CoinGecko** (gratuito): precio de Bitcoin en MXN y USD.
- **BTC Map** (opcional): ubicaciones de negocios que aceptan Bitcoin. Si falla, se usan datos de ejemplo.

---

## Licencia

Proyecto educativo, sin fines de lucro. Código abierto para el hackathon.
