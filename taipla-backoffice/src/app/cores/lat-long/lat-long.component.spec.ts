import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLongComponent } from './lat-long.component';

describe('LatLongComponent', () => {
  let component: LatLongComponent;
  let fixture: ComponentFixture<LatLongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatLongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
