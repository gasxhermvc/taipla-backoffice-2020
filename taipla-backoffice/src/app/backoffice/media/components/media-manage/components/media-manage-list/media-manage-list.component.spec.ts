import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaManageListComponent } from '@backoffice/media/components/media-manage/components/media-manage-list/media-manage-list.component';

describe('MediaManageListComponent', () => {
  let component: MediaManageListComponent;
  let fixture: ComponentFixture<MediaManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaManageListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
