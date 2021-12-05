import { Component, OnInit } from '@angular/core';
import { MapService } from './services/map.service';
import { shipImage } from './services/ship-image-url';
import { shipProperties } from './services/ship-properties';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  shipProperties = shipProperties;
  minDate;
  maxDate;
  step = 1000 * 60 * 5;
  historyDate: Date;
  public showTimeline = false;
  shipSelected;
  sog;
  time;
  url = 'https://i.ibb.co/RvQ8Xsj/Bev-Qj1638662845.jpg';

  constructor(public mapService: MapService) {}

  ngOnInit() {
    this.mapService.renderMap('map-container');
    this.mapService.getPositions();
    this.mapService.timeline$.subscribe(timeline => this.setTimeline(timeline));
    this.mapService.shipSelected$.subscribe(ship => {
      this.shipSelected = ship;
      this.showTimeline = false;
      this.url = shipImage(ship.mmsi);
    });
  }

  setTimeline(timeline) {
    const sog = [];
    const time = [];
    timeline.forEach(t => {
      sog.push(new Date(t[0]));
      time.push(t[2]);
    });
    this.time = [{data: time}];
    this.sog = sog;
    this.maxDate  = timeline[timeline.length - 1][0];
    this.minDate = timeline[0][0];
    this.historyDate = new Date(timeline[0][0]);
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
}
