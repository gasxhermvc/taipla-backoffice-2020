import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendManageComponent } from './legend-manage.component';

describe('LegendManageComponent', () => {
  let component: LegendManageComponent;
  let fixture: ComponentFixture<LegendManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
