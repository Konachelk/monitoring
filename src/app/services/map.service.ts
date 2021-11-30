import { Injectable } from '@angular/core';
import { LayerGroup, Map } from 'leaflet';
import * as L from 'leaflet';
import * as Settings from './map-settings';
import { DataMarker } from '../models/data-marker';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MapService {

  constructor(private apiService: ApiService) {
  }

  historyRouteMarker;

  // icon = {
  //   icon: L.icon({
  //     // iconSize: [ 25, 41 ],
  //     iconAnchor: [12, 30],
  //     iconUrl: 'leaflet/marker-icon.png',
  //     shadowUrl: 'leaflet/marker-shadow.png'
  //   })
  // };

  icon = {
    icon: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  };

  historyIcon = {
    icon: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  };
  private map: Map;
  private layerGroup: LayerGroup;
  private routeLayerGroup: LayerGroup;
  private trackLayerGroup: LayerGroup;
  private readonly _timeline = new BehaviorSubject<any>(null);
  readonly timeline$ = this._timeline.asObservable().pipe(filter(vale => vale !== null));

  private set timeline(val) {
    this._timeline.next(val);
  }

  private get timeline() {
    return this._timeline.getValue();
  }



  addMarkers(data) {
    this.layerGroup.clearLayers();
    data.forEach(({geometry: {coordinates}, mmsi}) => {
      const marker = new DataMarker([coordinates[1], coordinates[0]], {mmsi}, this.icon);
      marker.bindTooltip(`Name: ${marker.data.mmsi}, Lat: ${coordinates[1]}, lng: ${coordinates[0]}`);
      marker.on('click', this.markerOnClick, this);
      marker.addTo(this.layerGroup);
    });
  }

  addHistoryMarkers(data) {
    const timeline = this.timeline;
    const marker = timeline.filter(point => {
      return point[0] === parseInt(data);
    })[0][1];
    if (this.historyRouteMarker) {
      this.historyRouteMarker.setLatLng(marker);
    } else {
      this.historyRouteMarker = new L.Marker([marker.lat, marker.lng], this.historyIcon);
      this.historyRouteMarker.addTo(this.trackLayerGroup);
    }
  }

  renderMap(id: string): Map {
    this.map = L.map(id, Settings.initMapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Settings.tileLayerOptions).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.routeLayerGroup = L.layerGroup().addTo(this.map);
    this.trackLayerGroup = L.layerGroup().addTo(this.map);
    return this.map;
  }

  handleShipIntervalPoints(mmsi: string) {
    this.apiService.track(mmsi).subscribe(
      trackObj => {
        this.addShipTrackToRouteLayer(trackObj.tracks[0]);
        this.createTimeline(trackObj.tracks[0]);
      }
    );
  }

  addShipTrackToRouteLayer(rawTrack) {
    const plist = rawTrack.intervalPoints.map((v) => new L.LatLng(v.lat, v.lon));
    L.polyline(plist, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
    }).addTo(this.routeLayerGroup);
  }

  handleClick() {
    this.map.on('click', e => {
      // @ts-ignore
      this.addCircle(e.latlng.lat, e.latlng.lng);
    });
  }

  addCircle(lng, lat) {
    L.circle([lng, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 3000.0
    }).addTo(this.map);
  }

  unhookClick() {
    this.map.off('click');
  }

  markerOnClick(e) {
    this.resetHistory();
    this.handleShipIntervalPoints(e.target.data.mmsi);
  }

  private createTimeline(track: any) {
    const trackDates = track.intervalPoints.map((v) => [this.roundTimestamp(v.msgt), new L.LatLng(v.lat, v.lon)]);
    const dates = new Set();
    const filtered = trackDates.filter(trac => {
      if (dates.has(trac[0])) {
        return false;
      }
      dates.add(trac[0]);
      return true;
    });
    this.timeline = filtered;
  }

  private roundDate(date, minutes = 30) {
    const coeff = 1000 * 60 * minutes;
    return new Date(Math.round(Date.parse(date) / coeff) * coeff);
  }

  private roundTimestamp(date, minutes = 5) {
    const coeff = 1000 * 60 * minutes;
    return Math.round(Date.parse(date) / coeff) * coeff;
  }

  private resetHistory() {
    this.historyRouteMarker = null;
    this.trackLayerGroup.clearLayers();
    this.routeLayerGroup.clearLayers();
  }

  showRectangle({minX, maxX, minY, maxY}) {
    const corner1 = L.latLng(minY, minX);
    const corner2 = L.latLng(maxY, maxX);
    const co = L.latLngBounds(corner1, corner2);
    const rect =  L.rectangle(co, {color: '#ff7800', weight: 1});
    rect.addTo(this.map);
    setTimeout(() => rect.remove(), 3000);
  }
}


