import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionManageListComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-list/promotion-manage-list.component';

describe('PromotionManageListComponent', () => {
  let component: PromotionManageListComponent;
  let fixture: ComponentFixture<PromotionManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionManageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
