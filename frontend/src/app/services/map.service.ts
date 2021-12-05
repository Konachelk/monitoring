import { Injectable } from '@angular/core';
import { LayerGroup, Map } from 'leaflet';
import * as L from 'leaflet';
import * as Settings from './map-settings';
import { DataMarker } from '../models/data-marker';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { createTimeline, shipHistoryTrack } from './timeline';
import { historyIcon, icon } from './icons';

@Injectable()
export class MapService {
  private subscription: any;

  constructor(private apiService: ApiService) {
  }

  historyRouteMarker;
  private map: Map;
  private layerGroup: LayerGroup;
  private historyShipMarkerLayerGroup: LayerGroup;
  private historyTrackLayerGroup: LayerGroup;

  private readonly _visibleShipsData = new BehaviorSubject<any>(null);
  readonly visibleShipsData$ = this._visibleShipsData.asObservable().pipe(filter(val => val !== null));

  private set visibleShipsData(val) {
    this._visibleShipsData.next(val);
  }

  private get visibleShipsData() {
    return this._visibleShipsData.getValue();
  }

  private readonly _timeline = new BehaviorSubject<any>(null);
  readonly timeline$ = this._timeline.asObservable().pipe(filter(val => val !== null));

  private set timeline(val) {
    this._timeline.next(val);
  }

  private get timeline() {
    return this._timeline.getValue();
  }

  private readonly _shipSelected = new BehaviorSubject<any>(null);
  // readonly shipSelected$ = this._shipSelected.asObservable();
  readonly shipSelected$ = this._shipSelected.asObservable().pipe(filter(val => val !== null));

  private set shipSelected(val) {
    this._shipSelected.next(val);
  }

  private get shipSelected() {
    return this._shipSelected.getValue();
  }

  getPositions(rectangle = {minX: 6.00094, maxX: 10.67047, minY: 63.1564, maxY: 64.256}) {
    this.resetHistory();
    this.showAreaRectangle(rectangle);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.apiService.openPositionsInterval(rectangle).subscribe(
      data => {
        const dataSlice = data.slice(0, 200);
        this.shipSelected = null;
        this.visibleShipsData = this.createShipsData(dataSlice);
        this.addShipMarkersInSetArea(dataSlice);
      }
    );
  }
  createShipsData(openPositions) {
    return openPositions.reduce((acc, cur) => ({ ...acc, [cur.mmsi]: cur }), {});
  }

  addShipMarkersInSetArea(data) {
    this.layerGroup.clearLayers();
    data.forEach(({geometry: {coordinates}, mmsi}) => {
      this.addShipMarkerInSetArea(coordinates, mmsi);
    });
  }

  addShipMarkerInSetArea(coordinates, mmsi) {
    const marker = new DataMarker([coordinates[1], coordinates[0]], {mmsi, latLng: {lat: coordinates[1], lng: [coordinates[0]]} }, icon);
    marker.bindTooltip(`Mmsi: ${marker.data.mmsi}, Lat: ${coordinates[1]}, lng: ${coordinates[0]}`);
    marker.on('click', this.onMarkerClick, this);
    marker.addTo(this.layerGroup);
  }

  addHistoryMarker(timestamp) {
    const marker = this.shipLatLngByTimestamp(timestamp);
    if (this.historyRouteMarker && marker) {
      this.historyRouteMarker.setLatLng(marker);
    } else if (marker) {
      this.historyRouteMarker = new L.Marker([marker.lat, marker.lng], historyIcon);
      this.historyRouteMarker.addTo(this.historyTrackLayerGroup);
    }
  }

  shipLatLngByTimestamp(timestamp) {
    return timestamp
      ? this.timeline.find(point => point[0] === timestamp)?.[1]
      : this.timeline[0]?.[1];
  }

  renderMap(id: string): Map {
    this.map = L.map(id, Settings.initMapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', Settings.tileLayerOptions).addTo(this.map);
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.historyShipMarkerLayerGroup = L.layerGroup().addTo(this.map);
    this.historyTrackLayerGroup = L.layerGroup().addTo(this.map);
    return this.map;
  }

  openTimeline(mmsi: string) {
    this.apiService.track(mmsi).subscribe(
      trackObj => {
        this.addShipHistoryTrackToRouteLayer(trackObj.tracks[0]);
        this.timeline = createTimeline(trackObj.tracks[0]);
        this.addHistoryMarker(null);
      }
    );
  }

  addShipHistoryTrackToRouteLayer(rawTrack) {
    shipHistoryTrack(rawTrack).addTo(this.historyShipMarkerLayerGroup);
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

  onMarkerClick(e) {
    this.selectShip(e.target.data.mmsi);
  }

  selectShip(mmsi) {
    this.resetHistory();
    this.shipSelected = this.visibleShipsData[mmsi];
    const coordinates = this.shipSelected.geometry.coordinates;
    this.map.panTo(new L.LatLng(coordinates[1], coordinates[0]));
  }

  public resetHistory() {
    this.historyRouteMarker = null;
    this.historyTrackLayerGroup.clearLayers();
    this.historyShipMarkerLayerGroup.clearLayers();
  }

  showAreaRectangle({minX, maxX, minY, maxY}) {
    const bounds = L.latLngBounds(L.latLng(minY, minX), L.latLng(maxY, maxX));
    const rectangle =  L.rectangle(bounds, {color: '#ff7800', weight: 1});
    rectangle.addTo(this.map);
    setTimeout(() => rectangle.remove(), 3000);
  }

  enableDrag() {
    this.map.dragging.enable();
  }

  disableDrag() {
    this.map.dragging.disable();
  }
}


