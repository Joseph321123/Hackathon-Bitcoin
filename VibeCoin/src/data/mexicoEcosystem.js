/**
 * mexicoEcosystem.js — Datos del ecosistema Bitcoin en México.
 *
 * Array de entradas con id, name, description, link, lat, lon. Se usa en Recursos (pestaña
 * "Ecosistema Bitcoin en México") para las tarjetas de Aureo Bitcoin y La Casa de Satoshi,
 * y en EcosistemaMapa/MapLeaflet como ecosystemMarkers para los marcadores del mapa con popup.
 */

export const MEXICO_ECOSYSTEM = [
  {
    id: 'aureo',
    name: 'Aureo Bitcoin',
    description: 'Plataforma enfocada en Bitcoin en México. Permite comprar y vender Bitcoin y ofrece orientación sobre autocustodia y ahorro a largo plazo en Bitcoin.',
    link: 'https://www.aureobitcoin.com',
    lat: 19.4326,
    lon: -99.1332,
  },
  {
    id: 'lacasadesatoshi',
    name: 'La Casa de Satoshi',
    description: 'Hub de la comunidad Bitcoin en Ciudad de México donde desarrolladores, educadores y entusiastas se reúnen para colaborar, asistir a eventos y construir proyectos relacionados con Bitcoin.',
    link: 'https://www.lacasadesatoshi.xyz',
    lat: 19.4326,
    lon: -99.1332,
  },
];
