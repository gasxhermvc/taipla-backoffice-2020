import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendManageAddComponent } from './legend-manage-add.component';

describe('LegendManageAddComponent', () => {
  let component: LegendManageAddComponent;
  let fixture: ComponentFixture<LegendManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendManageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
