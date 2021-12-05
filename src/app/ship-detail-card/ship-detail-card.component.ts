import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship-detail-card',
  templateUrl: './ship-detail-card.component.html',
  styleUrls: ['./ship-detail-card.component.scss']
})
export class ShipDetailCardComponent implements OnInit {

  @Input() detail;
  @Input() shipSelected;

  ngOnInit(): void {
  }

}
