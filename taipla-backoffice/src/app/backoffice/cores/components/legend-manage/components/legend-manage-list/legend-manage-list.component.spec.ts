import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendManageListComponent } from './legend-manage-list.component';

describe('LegendManageListComponent', () => {
  let component: LegendManageListComponent;
  let fixture: ComponentFixture<LegendManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendManageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
