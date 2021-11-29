import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from 'leaflet';
import { MapService } from './services/map.service';
import { ApiService } from './services/api.service';
const positons = require('./services/open-positions.json');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private map: Map;

  constructor(private mapService: MapService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.map = this.mapService.renderMap('map-container');
    this.apiService.openPositions().subscribe(data => data.forEach(position => this.mapService.addMarkers(position)));
  }

  drawCircle() {
    this.mapService.handleClick();
  }

  stopDrawCircle() {
    this.mapService.unhookClick();
  }

  ngAfterViewInit() {
  }
}
