import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTemplateComponent } from '@app/app-base/components/layout-template/layout-template.component';

describe('LayoutComponent', () => {
  let component: LayoutTemplateComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
