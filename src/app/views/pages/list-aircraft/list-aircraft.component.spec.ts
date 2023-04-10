import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAircraftComponent } from './list-aircraft.component';

describe('ListAircraftComponent', () => {
  let component: ListAircraftComponent;
  let fixture: ComponentFixture<ListAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAircraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
