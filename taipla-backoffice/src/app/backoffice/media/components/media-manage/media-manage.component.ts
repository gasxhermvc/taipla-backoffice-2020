import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { MediaService, MEDIA_INFO } from '@app/backoffice/services/media.service';
import { BaseClass } from '@app/based/classes/base-class';
import { MediaManageListComponent } from '@backoffice/media/components/media-manage/components/media-manage-list/media-manage-list.component';

@Component({
  selector: 'app-media-manage',
  templateUrl: './media-manage.component.html',
  styleUrls: ['./media-manage.component.scss']
})
export class MediaManageComponent extends BaseClass implements OnInit {

  @ViewChild(MediaManageListComponent) fcList: MediaManageListComponent;

  MODE = MODE;

  get service(): MediaService {
    return this.store['media'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).mm = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.MEDIA_INFO !== undefined ? this.service.MEDIA_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.MEDIA_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.fcList) {
            this.fcList.retrieveData();
          }
          break;
        case MODE.VIEW:
        case MODE.COMPLETE:
        default:
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          break;
      }
    } else {
      this.service.STATE = this.service.STATE_PAGE.LISTS;
    }
  }


  onSelected(item: MEDIA_INFO) {
    this.service.MEDIA_INFO = item;
    this.initMode();
  }

  onComplete() {
    const doMODE = this.service.MEDIA_INFO !== undefined ? this.service.MEDIA_INFO.MODE : undefined;
    switch (doMODE) {
      case MODE.ADD:
        this.service.STATE = this.service.STATE_PAGE.EDIT;
        this.service.MEDIA_INFO.MODE = MODE.EDIT;
        break;
      default:
        break;
    }
    this.initMode();
  }

  onBack() {
    this.service.MEDIA_INFO = undefined;
    this.initMode();
  }

}

