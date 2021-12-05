import * as L from 'leaflet';
import { MapOptions } from 'leaflet';
import { TileLayerOptions } from 'leaflet';

const bounds: L.LatLngBounds = L.latLngBounds(L.latLng(45, -10), L.latLng(80.0, 50.0));

export const initMapOptions: MapOptions = {
  center: [63.45, 9.53],
  minZoom: 5,
  maxZoom: 15,
  zoom: 7,
  zoomControl: false,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  bounceAtZoomLimits: true,
  scrollWheelZoom: true,
  preferCanvas: true,
};
export const tileLayerOptions: TileLayerOptions  = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c'],
  bounds,
  noWrap: true,
  detectRetina: true,
};
