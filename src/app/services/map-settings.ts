import * as L from 'leaflet';
import { MapOptions } from 'leaflet';
import { TileLayerOptions } from 'leaflet';

const bounds: L.LatLngBounds = L.latLngBounds(L.latLng(-90.0, -180.0), L.latLng(90.0, 180.0));

export const initMapOptions: MapOptions = {
  center: [65.45, 9.53],
  minZoom: 3,
  maxZoom: 15,
  zoom: 5,
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
