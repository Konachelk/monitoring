import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from 'leaflet';
import { MapService } from './services/map.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
const positons = require('./services/open-positions.json');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private map: Map;
  private subscription;
  minDate;
  maxDate;
  step = 1000 * 60 * 5;
  historyDate: Date;
  val;
  rectangle = {
    minX: 9.00094,
    maxX: 10.67047,
    minY: 63,
    maxY: 64,
  };

  constructor(public mapService: MapService, private apiService: ApiService, private authService: AuthService) {
  }

  ngOnInit() {
    this.map = this.mapService.renderMap('map-container');
    this.getPositions();
    this.mapService.timeline$.subscribe(timeline => this.setTimeline(timeline));
  }

  getPositions() {
    this.mapService.showRectangle(this.rectangle);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.apiService.openPositions(this.rectangle).subscribe(
      data => {
        this.mapService.addMarkers(data.slice(0, 200));
      }
    );
  }

  setTimeline(timeline) {
    this.maxDate  = timeline[timeline.length - 1][0];
    this.minDate = timeline[0][0];
  }

  drawCircle() {
    this.mapService.handleClick();
  }

  stopDrawCircle() {
    this.mapService.unhookClick();
  }

  ngAfterViewInit() {
  }

  showRouteHistory(e) {
    this.mapService.addHistoryMarkers(e.value);
    this.historyDate = new Date(parseInt(e.value));
  }
}
