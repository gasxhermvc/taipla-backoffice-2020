import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendManagerComponent } from './legend-manager.component';

describe('LegendManagerComponent', () => {
  let component: LegendManagerComponent;
  let fixture: ComponentFixture<LegendManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
