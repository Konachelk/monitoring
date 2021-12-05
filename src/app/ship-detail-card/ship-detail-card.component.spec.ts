import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDetailCardComponent } from './ship-detail-card.component';

describe('ShipDetailCardComponent', () => {
  let component: ShipDetailCardComponent;
  let fixture: ComponentFixture<ShipDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
