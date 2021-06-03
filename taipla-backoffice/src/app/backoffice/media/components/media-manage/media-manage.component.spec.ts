import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaManageComponent } from '@backoffice/media/components/media-manage/media-manage.component';

describe('MediaManageComponent', () => {
  let component: MediaManageComponent;
  let fixture: ComponentFixture<MediaManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
