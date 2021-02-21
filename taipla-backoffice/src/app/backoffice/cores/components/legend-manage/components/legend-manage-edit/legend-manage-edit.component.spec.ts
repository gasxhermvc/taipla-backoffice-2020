import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendManageEditComponent } from './legend-manage-edit.component';

describe('LegendManageEditComponent', () => {
  let component: LegendManageEditComponent;
  let fixture: ComponentFixture<LegendManageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendManageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
