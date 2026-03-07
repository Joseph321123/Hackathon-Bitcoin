import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

if (typeof L !== 'undefined' && L.Icon?.Default?.prototype?._getIconUrl) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

/**
 * Mapa Leaflet creado con la API imperativa para evitar
 * "Map container is already initialized" (react-leaflet + Strict Mode).
 */
export function MapLeaflet({ locations, defaultCenter = [19.4326, -99.1332], defaultZoom = 5 }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: defaultCenter,
      zoom: defaultZoom,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const list = Array.isArray(locations) ? locations : [];
    const markers = list.map((loc) => {
      const marker = L.marker([loc.lat, loc.lon]).addTo(map);
      marker.bindPopup(`<strong>${escapeHtml(loc.name || 'Negocio Bitcoin')}</strong><br/>Acepta Bitcoin`);
      return marker;
    });

    if (list.length > 0) {
      map.setView([list[0].lat, list[0].lon], 5);
    }

    mapRef.current = map;

    return () => {
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [locations?.length]);

  return (
    <div className="bitcoin-map__container">
      <div
        ref={containerRef}
        className="bitcoin-map__leaflet"
        style={{ height: '450px', width: '100%' }}
        aria-label="Mapa de negocios que aceptan Bitcoin"
      />
    </div>
  );
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
