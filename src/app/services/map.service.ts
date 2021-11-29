import { Injectable } from '@angular/core';
import { Map} from 'leaflet';
import * as L from 'leaflet';
import * as Settings from './map-settings';

@Injectable()
export class MapService {
  private map: Map;

  constructor() {
  }

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  }

  public addMarkers({geometry: {coordinates}}) {
    const marker = L.marker([coordinates[1], coordinates[0]], this.icon);
    console.log(marker.getLatLng());
    marker.addTo(this.map);
  }

  public renderMap(id: string): Map {
    this.map = L.map(id, Settings.initMapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Settings.tileLayerOptions).addTo(this.map);
    return this.map;
  }

}


