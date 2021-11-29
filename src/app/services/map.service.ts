import { Injectable } from '@angular/core';
import { Map} from 'leaflet';
import * as L from 'leaflet';
import * as Settings from './map-settings';

@Injectable()
export class MapService {

  constructor() {
  }

  public renderMap(id: string): Map {
    const map: Map = L.map(id, Settings.initMapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Settings.tileLayerOptions).addTo(map);
    return map;
  }

}


