# ₿ VibeCoin

**Plataforma educativa e interactiva** para aprender, practicar y explorar el ecosistema de **Bitcoin**, con enfoque en usuarios en **México** y principiantes. Desarrollada con React + Vite para el hackathon de educación Bitcoin.

---

## Índice

1. [Descripción general](#descripción-general)
2. [Requisitos e instalación](#requisitos-e-instalación)
3. [Desarrollo local](#desarrollo-local)
4. [Build y preview](#build-y-preview)
5. [Despliegue (GitHub Pages)](#despliegue-github-pages)
6. [Cómo funciona la página](#cómo-funciona-la-página)
7. [Estructura del proyecto](#estructura-del-proyecto)
8. [APIs y datos externos](#apis-y-datos-externos)
9. [Tecnologías](#tecnologías)
10. [Licencia](#licencia)

---

## Descripción general

VibeCoin ofrece:

- **Aprender** — Conceptos básicos (blockchain, billeteras, seguridad) en lenguaje sencillo.
- **Practicar** — Simuladores de compra y envío, juego de frase semilla, detector de estafas y quiz.
- **Explorar** — Mapa de empresas que aceptan Bitcoin, métricas en vivo y recursos (incluido ecosistema en México).

La interfaz es **responsive**, con **tema claro/oscuro** y **seguimiento de progreso** en la ruta de principiantes (6 pasos hasta “VibeCoin Master”).

---

## Requisitos e instalación

### Requisitos

- **Node.js** 18 o superior  
- **npm** (o yarn)

### Instalación

```bash
# Entrar a la carpeta del proyecto
cd VibeCoin

# Instalar dependencias
npm install
```

---

## Desarrollo local

```bash
npm run dev
```

- La app se abre en **http://localhost:5173**.
- En local se usa **HashRouter**: las URLs llevan `#` (por ejemplo `http://localhost:5173/#/`, `http://localhost:5173/#/principiante`, `http://localhost:5173/#/mapa`). Así la navegación funciona sin servidor adicional.
- El **proxy de Vite** redirige `/api-coingecko` y `/api-mempool` a las APIs externas para evitar CORS en desarrollo.

---

## Build y preview

### Build para producción

```bash
npm run build
```

- La salida se genera en la carpeta **`dist/`**.
- Para GitHub Pages es necesario que el **`base`** en `vite.config.js` coincida con el nombre del repositorio (ver sección de despliegue).

### Probar el build en local

```bash
npm run preview
```

- Sirve el contenido de `dist/` para comprobar que todo funciona antes de desplegar.

---

## Despliegue (GitHub Pages)

### 1. Configurar la base en Vite

En **`vite.config.js`** el `base` debe ser la ruta del repo en GitHub Pages:

- Si el repo se llama **VibeCoin**, la URL será `https://<usuario>.github.io/VibeCoin/` y en config suele usarse `base: '/VibeCoin/'`.
- El proyecto ya está preparado para usar `process.env.VITE_BASE_URL` o, en GitHub Actions, `process.env.GITHUB_ACTIONS` para elegir el base correcto.

Si tu repositorio tiene **otro nombre** (por ejemplo `Hackathon-Bitcoin`):

1. En `vite.config.js` cambia la línea del `base` para que en producción use `'/Hackathon-Bitcoin/'` (o el nombre que corresponda).
2. Ajusta en el workflow de GitHub Actions las rutas `VibeCoin/` si el código no está en una subcarpeta `VibeCoin`.

### 2. Despliegue con GitHub Actions (recomendado)

1. Crea en la **raíz del repositorio** (no dentro de `VibeCoin`) la carpeta `.github/workflows/` y el archivo `deploy.yml` con contenido similar a:

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

2. Si el proyecto **no** está en la subcarpeta `VibeCoin` (está en la raíz del repo), cambia:
   - `cache-dependency-path` a `./package-lock.json`
   - `path` a `./dist`
   - y los `cd VibeCoin` según corresponda.

3. En GitHub: **Settings → Pages → Source** → selecciona **GitHub Actions**.

4. Tras un push a `main`, el workflow construye y despliega. La URL será:  
   `https://<tu-usuario>.github.io/<nombre-repo>/`

### 3. Despliegue manual (build local + subir `dist`)

1. En `vite.config.js` define `base: '/<nombre-repo>/'`.
2. Ejecuta `npm run build` dentro de `VibeCoin`.
3. En **Settings → Pages** elige la rama (por ejemplo `gh-pages`) y la carpeta donde esté el contenido de `dist` (por ejemplo raíz de `gh-pages`).

Recomendación: usar **GitHub Actions** para que cada push a `main` actualice la página automáticamente.

---

## Cómo funciona la página

### Navegación principal

- **Inicio** — Landing con intro, propiedades de Bitcoin, métricas, gráfico de precio 30 días, casos de uso, dato curioso, por qué aprender Bitcoin y calculadora MXN/BTC.
- **Principiante** — Hub con 6 módulos: Aprende lo básico, Simulador de compra, Juego frase semilla, Estafas, Simulador de envío, Quiz. La barra de progreso solo se muestra en rutas de principiante y en “Felicitaciones”.
- **Avanzado** — Dashboard y juegos (adivinar precio, viaje en el tiempo, etc.).
- **Mapa** — Empresas globales que aceptan Bitcoin y mapa interactivo (OpenStreetMap) con marcadores; incluye puntos del ecosistema en México (Aureo Bitcoin, La Casa de Satoshi).
- **Noticias** — Métricas en vivo (hashrate, dificultad, mempool) y feed de noticias.
- **Recursos** — Pestañas: Conceptos básicos, Comprar y guardar, Seguridad, Métricas avanzadas, Ecosistema Bitcoin en México (Aureo Bitcoin, La Casa de Satoshi). Incluye diagrama de blockchain y videos.

### Flujo de principiante (6 pasos)

1. **Aprende** — Lección básica; al terminar se marca “learnedBasics”.
2. **Comprar** — Simulador MXN → BTC con precio en vivo.
3. **Wallet** — Juego de ordenar la frase semilla.
4. **Estafas** — Juego de clasificar estafa vs seguro.
5. **Enviar** — Simulador de envío de Bitcoin.
6. **Quiz** — Preguntas con temporizador; se guarda puntuación y “quizCompleted”.

Al completar los 6 pasos se muestra el enlace a **Felicitaciones** (VibeCoin Master). El progreso se persiste en **localStorage** (`vibecoin-progress`).

### Tema y persistencia

- **Modo oscuro/claro**: se guarda en `localStorage` bajo la clave `vibecoin-dark` y se aplica con `data-theme` en la raíz del documento.
- **Progreso**: se guarda en `vibecoin-progress` (pasos completados, puntuación del quiz, badges).

### Datos en tiempo real

- **Precio BTC**: CoinGecko (MXN, USD, cambio 24h); en dev vía proxy para evitar CORS.
- **Gráfico 30 días**: CoinGecko `market_chart`; línea verde/roja según tendencia.
- **Mapa**: ubicaciones desde API BTC Map (o fallback estático); marcadores de empresas famosas y ecosistema México desde datos locales.

---

## Estructura del proyecto

```
VibeCoin/
├── public/                 # Assets estáticos (si existen)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Layout.jsx      # Envoltorio: Nav, barra de progreso (en principiante), footer
│   │   ├── Nav.jsx         # Navegación principal y botón tema
│   │   ├── ProgressTracker.jsx  # Barra de 6 pasos + enlace Master
│   │   ├── ErrorBoundary.jsx    # Captura errores de React
│   │   ├── BitcoinCard.jsx     # Tarjeta con título e icono
│   │   ├── BuySimulator.jsx    # Simulador MXN → BTC
│   │   ├── MxnBtcCalculator.jsx # Calculadora en Home
│   │   ├── SeedPhraseGame.jsx   # Juego frase semilla
│   │   ├── ScamGame.jsx         # Estafa o seguro
│   │   ├── SendSimulator.jsx    # Simulador de envío
│   │   ├── QuizGame.jsx         # Quiz tipo Kahoot
│   │   ├── MiniBtcChart.jsx     # Gráfico 30 días (Recharts)
│   │   ├── MapLeaflet.jsx       # Mapa OpenStreetMap (Leaflet)
│   │   ├── BitcoinMap.jsx       # Contenedor mapa (usa MapLeaflet)
│   │   ├── BlockchainDiagram.jsx
│   │   ├── AdvancedDashboard.jsx
│   │   ├── Achievements.jsx
│   │   └── games/              # Juegos avanzados (GuessPrice, TimeTraveler)
│   ├── pages/              # Una página por ruta
│   │   ├── Home.jsx
│   │   ├── Principiantes.jsx    # Hub principiante + lista de módulos
│   │   ├── Learn.jsx
│   │   ├── Buy.jsx
│   │   ├── WalletGame.jsx
│   │   ├── ScamDetector.jsx
│   │   ├── Send.jsx
│   │   ├── Quiz.jsx
│   │   ├── EcosistemaMapa.jsx   # Página "Mapa" (empresas + mapa)
│   │   ├── Avanzado.jsx
│   │   ├── BitcoinGames.jsx
│   │   ├── Noticias.jsx
│   │   ├── Recursos.jsx
│   │   ├── Congratulations.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Persistencia en localStorage
│   │   ├── useProgress.js       # Estado y marcado de pasos principiante
│   │   ├── useBitcoinPrice.js   # Precio BTC (MXN/USD)
│   │   └── useBtcMarketOverview.js  # Precio, cambio 24h, market cap
│   ├── services/
│   │   ├── api.js               # CoinGecko, BTC Map, helpers
│   │   ├── dashboardApi.js     # Métricas avanzadas
│   │   └── historyApi.js       # Histórico precio (gráficos)
│   ├── data/                # Datos estáticos
│   │   ├── learnCards.js
│   │   ├── scamData.js
│   │   ├── quizData.js
│   │   ├── famousPlaces.js      # Empresas globales (Tesla, Microsoft, etc.)
│   │   ├── mexicoEcosystem.js   # Aureo Bitcoin, La Casa de Satoshi
│   │   ├── mapLocations.js      # Fallback ubicaciones mapa
│   │   ├── newsFeed.js
│   │   ├── badges.js
│   │   └── ...
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx              # Rutas, tema, Router (Hash/Browser)
│   ├── main.jsx             # Punto de entrada React
│   ├── index.css            # Variables CSS y estilos globales
│   └── App.css
├── index.html
├── vite.config.js           # Vite + proxy API
├── package.json
└── README.md
```

---

## APIs y datos externos

| Origen        | Uso                                                                 |
|---------------|---------------------------------------------------------------------|
| **CoinGecko** | Precio BTC (MXN, USD), cambio 24h, gráfico 30 días. En dev vía proxy. |
| **BTC Map**   | Ubicaciones de negocios que aceptan Bitcoin. Si falla, se usan datos en `data/mapLocations.js`. |
| **mempool.space** | Métricas de red (opcional). En dev vía proxy.                    |

- Se usa caché y respaldo ante rate limit (429) o fallo de red para no romper la experiencia.

---

## Tecnologías

- **React 19** + **Vite 7**
- **React Router** (HashRouter en local, BrowserRouter en producción con base)
- **Recharts** — Gráficos (precio 30 días, dashboards)
- **Leaflet** — Mapa interactivo (OpenStreetMap)
- **CSS** — Variables para tema claro/oscuro y diseño responsive

---

## Licencia

Proyecto educativo, sin fines de lucro. Código abierto para el hackathon de educación Bitcoin.
