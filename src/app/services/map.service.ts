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

  addMarkers({geometry: {coordinates}}) {
    const marker = L.marker([coordinates[1], coordinates[0]], this.icon);
    // console.log(marker.getLatLng());
    marker.addTo(this.map);
  }

  renderMap(id: string): Map {
    this.map = L.map(id, Settings.initMapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Settings.tileLayerOptions).addTo(this.map);
    return this.map;
  }

  handleClick() {
    console.log('e')
    this.map.on('click', e => {
      console.log('e');
      // @ts-ignore
      this.addCircle(e.latlng.lat, e.latlng.lng);
    });
  }

  addCircle(lng, lat) {
    L.circle([lng, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 300.0
    }).addTo(this.map);
  }

  unhookClick() {
    this.map.off('click');
  }
}


