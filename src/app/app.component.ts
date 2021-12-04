import { Component, OnInit } from '@angular/core';
import { Map } from 'leaflet';
import { MapService } from './services/map.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private map: Map;
  minDate;
  maxDate;
  step = 1000 * 60 * 5;
  historyDate: Date;
  public showTimeline = false;
  shipSelected;
  sog;
  time;

   nazwa = [['MMSI', 'mmsi'], ['Ship name', 'name'], ['Call sign', 'callsign'], ['Country', 'country'], ['Destination', 'destination'], ['Ship type', 'shipType'], ['ETA', 'eta']];

  constructor(public mapService: MapService) {
  }

  ngOnInit() {
    this.map = this.mapService.renderMap('map-container');
    this.mapService.getPositions();
    this.mapService.timeline$.subscribe(timeline => this.setTimeline(timeline));
    this.mapService.shipSelected$.subscribe(ship => {this.shipSelected = ship; this.showTimeline = false; });
  }

  setTimeline(timeline) {
    const sog = [];
    const time = [];
    timeline.forEach(t => {
      sog.push(new Date(t[0]));
      time.push(t[2]);
    });
    this.sog = [{data: time}];
    this.time = sog;
    this.maxDate  = timeline[timeline.length - 1][0];
    this.minDate = timeline[0][0];
    this.historyDate = new Date(timeline[0][0]);
  }

  drawCircle() {
    this.mapService.handleClick();
  }

  stopDrawCircle() {
    this.mapService.unhookClick();
  }

  showRouteHistory(e) {
    this.mapService.addHistoryMarker(parseInt(e.value));
    this.historyDate = new Date(parseInt(e.value));
  }

  toggleShowTimeline(mmsi) {
    this.sog = null;
    this.time = null;
    this.mapService.resetHistory();
    if (!this.showTimeline) {
      this.mapService.openTimeline(mmsi);
    }
    this.showTimeline = !this.showTimeline;
  }

  enableDrag() {
    this.map.dragging.enable();
  }

  disableDrag() {
    this.map.dragging.disable();
  }
}
