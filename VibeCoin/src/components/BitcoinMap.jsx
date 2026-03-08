import { useState, useEffect, lazy, Suspense } from 'react';
import { getBitcoinLocations } from '../services/api';
import { fallbackMapLocations } from '../data/mapLocations';
import { famousPlaces } from '../data/famousPlaces';
import { BitcoinCard } from './BitcoinCard';
import './BitcoinMap.css';

const MapLeaflet = lazy(() =>
  import('./MapLeaflet.jsx').then((m) => ({ default: m.MapLeaflet }))
);

/**
 * Página Mapa: marcas famosas que aceptan Bitcoin (Tesla, Microsoft, etc.) + mapa de puntos
 */
export function BitcoinMap({ onVisit }) {
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
      .finally(() => {
        setLoading(false);
        onVisit?.();
      });
  }, [onVisit]);

  return (
    <div className="bitcoin-map">
      <BitcoinCard title="Dónde aceptan Bitcoin" icon="🗺️">
        <p>Marcas conocidas y lugares donde puedes pagar con Bitcoin. Abajo verás establecimientos como Tesla o Microsoft y un mapa con más ubicaciones.</p>
      </BitcoinCard>

      <section className="famous-places" aria-labelledby="famous-title">
        <h2 id="famous-title" className="famous-places__title">Marcas y establecimientos que aceptan Bitcoin</h2>
        <p className="famous-places__intro">Empresas conocidas que permiten pagar con Bitcoin (directamente o mediante BitPay, Strike, etc.).</p>
        <div className="famous-places__grid">
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

      <section className="bitcoin-map__section" aria-labelledby="map-title">
        <h2 id="map-title" className="bitcoin-map__section-title">Mapa de lugares por ubicación</h2>
        <p className="bitcoin-map__map-hint">
          En el mapa aparecen las marcas famosas (Tesla, Microsoft, Starbucks, Bitso, etc.) y más puntos. Haz clic en cualquier marcador para ver <strong>Acepta Bitcoin</strong>.
        </p>
        {loading ? (
          <p className="bitcoin-map__loading">Cargando ubicaciones…</p>
        ) : (
          <>
            <div className="bitcoin-map__list">
              <p className="bitcoin-map__list-hint">Algunos negocios y puntos que aceptan Bitcoin (datos de la comunidad o ejemplo):</p>
              <ul className="bitcoin-map__locations">
                {locations.slice(0, 12).map((loc) => (
                  <li key={loc.id}>
                    <strong>{loc.name}</strong>
                    <span className="bitcoin-map__coords"> {loc.lat?.toFixed(2)}, {loc.lon?.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!showMap ? (
              <button
                type="button"
                className="btn btn--primary bitcoin-map__toggle"
                onClick={() => setShowMap(true)}
              >
                Abrir mapa interactivo
              </button>
            ) : (
              <Suspense fallback={<p className="bitcoin-map__loading">Cargando mapa…</p>}>
                <MapLeaflet
                  locations={locations}
                  famousPlaces={famousPlaces}
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
