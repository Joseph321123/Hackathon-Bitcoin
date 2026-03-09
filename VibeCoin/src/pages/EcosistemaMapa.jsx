import { useState, useEffect, lazy, Suspense } from 'react';
import { getBitcoinLocations } from '../services/api';
import { fallbackMapLocations } from '../data/mapLocations';
import { famousPlaces } from '../data/famousPlaces';
import { MEXICO_ECOSYSTEM } from '../data/mexicoEcosystem';
import '../components/BitcoinMap.css';
import './EcosistemaMapa.css';

const MapLeaflet = lazy(() =>
  import('../components/MapLeaflet.jsx').then((m) => ({ default: m.MapLeaflet }))
);

/**
 * EcosistemaMapa.jsx — Página "Mapa" (ruta /mapa).
 *
 * Estructura: intro, bloque "Empresas globales que aceptan Bitcoin" (tarjetas de famousPlaces),
 * bloque "Mapa interactivo" con botón para cargar el mapa. MapLeaflet se carga en lazy y recibe
 * locations (API BTC Map o fallback), famousPlaces y ecosystemMarkers (MEXICO_ECOSYSTEM:
 * Aureo Bitcoin, La Casa de Satoshi) para mostrar todos los marcadores con popups.
 */
export function EcosistemaMapa() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    getBitcoinLocations()
      .then((list) => {
        if (list.length > 0) setLocations(list);
        else setLocations(fallbackMapLocations);
      })
      .catch(() => setLocations(fallbackMapLocations))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ecosistema-mapa section-page">
      <header className="ecosistema-mapa__header">
        <h1 className="ecosistema-mapa__title">Mapa</h1>
        <p className="ecosistema-mapa__intro">
          Tanto empresas globales como proyectos locales están construyendo el ecosistema Bitcoin.
          Aquí puedes ver algunas empresas conocidas que aceptan Bitcoin y un mapa interactivo.
        </p>
      </header>

      <section className="ecosistema-mapa__block" aria-labelledby="block-global-title">
        <h2 id="block-global-title" className="ecosistema-mapa__block-title">
          Empresas globales que aceptan Bitcoin
        </h2>
        <div className="ecosistema-mapa__cards famous-places__grid">
          {famousPlaces.map((place) => (
            <article key={place.id} className="famous-places__card">
              <div className="famous-places__card-header">
                <h3 className="famous-places__name">{place.name}</h3>
                <span className="famous-places__category">{place.category}</span>
              </div>
              <p className="famous-places__desc">{place.description}</p>
              <p className="famous-places__region"><strong>Dónde:</strong> {place.region}</p>
              {place.link && (
                <a href={place.link} target="_blank" rel="noopener noreferrer" className="famous-places__link">
                  Ver sitio web →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="ecosistema-mapa__block ecosistema-mapa__map-block" aria-labelledby="block-map-title">
        <h2 id="block-map-title" className="ecosistema-mapa__block-title">
          Mapa interactivo
        </h2>
        <p className="ecosistema-mapa__map-hint">
          En el mapa aparecen las marcas famosas, proyectos del ecosistema en México (Aureo Bitcoin, La Casa de Satoshi) y más puntos. Haz clic en cualquier marcador para ver detalles.
        </p>
        {loading ? (
          <p className="ecosistema-mapa__loading">Cargando ubicaciones…</p>
        ) : (
          <>
            {!showMap ? (
              <button
                type="button"
                className="btn btn--primary ecosistema-mapa__toggle"
                onClick={() => setShowMap(true)}
              >
                Abrir mapa interactivo
              </button>
            ) : (
              <Suspense fallback={<p className="ecosistema-mapa__loading">Cargando mapa…</p>}>
                <MapLeaflet
                  locations={locations}
                  famousPlaces={famousPlaces}
                  ecosystemMarkers={MEXICO_ECOSYSTEM}
                  defaultCenter={[19.4326, -99.1332]}
                  defaultZoom={4}
                />
              </Suspense>
            )}
          </>
        )}
      </section>
    </div>
  );
}
