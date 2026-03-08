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
 * Mapa Leaflet: muestra ubicaciones normales + marcas famosas (Tesla, Microsoft, etc.).
 * Al hacer clic en cualquier marcador se muestra "Acepta Bitcoin".
 */
export function MapLeaflet({ locations = [], famousPlaces = [], defaultCenter = [19.4326, -99.1332], defaultZoom = 5 }) {
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

    const markers = [];

    // Marcas famosas (Tesla, Microsoft, Bitso, etc.)
    const famous = Array.isArray(famousPlaces) ? famousPlaces.filter((p) => p.lat != null && p.lon != null) : [];
    famous.forEach((place) => {
      const marker = L.marker([place.lat, place.lon]).addTo(map);
      const category = place.category ? ` — ${escapeHtml(place.category)}` : '';
      marker.bindPopup(
        `<strong>${escapeHtml(place.name || '')}</strong>${category}<br/><span class="popup-accepts">✓ Acepta Bitcoin</span>`
      );
      markers.push(marker);
    });

    // Ubicaciones de la API / fallback
    const list = Array.isArray(locations) ? locations : [];
    list.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lon]).addTo(map);
      marker.bindPopup(
        `<strong>${escapeHtml(loc.name || 'Negocio Bitcoin')}</strong><br/><span class="popup-accepts">✓ Acepta Bitcoin</span>`
      );
      markers.push(marker);
    });

    const total = famous.length + list.length;
    if (total > 0) {
      map.setView(defaultCenter, defaultZoom);
    }

    mapRef.current = map;

    return () => {
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [locations?.length, famousPlaces?.length, defaultCenter, defaultZoom]);

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
