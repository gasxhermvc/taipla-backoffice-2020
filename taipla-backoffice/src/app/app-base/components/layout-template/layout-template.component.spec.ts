//=>Angular
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//=>App
import { moduleConfig } from '@based/configs/test-config';
import { LayoutTemplateComponent } from '@app-base/components/layout-template/layout-template.component';

describe('LayoutTemplateComponent', () => {
  let component: LayoutTemplateComponent;
  let fixture: ComponentFixture<LayoutTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...moduleConfig],
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
