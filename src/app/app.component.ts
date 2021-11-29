import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from 'leaflet';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private map: Map;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.map = this.mapService.renderMap('map-container');
  }

  ngAfterViewInit() {
  }
}
