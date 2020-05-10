import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { UmService, UM_INFO } from '@backoffice/services/um.service';
import { MODE } from '@app-base/enums/MODE';
import { UmManageListComponent } from '@backoffice/um/components/um-manage/components/um-manage-list/um-manage-list.component';

@Component({
  selector: 'app-um-manage',
  templateUrl: './um-manage.component.html',
  styleUrls: ['./um-manage.component.scss'],
})

export class UmManageComponent extends BaseClass implements OnInit {

  @ViewChild(UmManageListComponent, { static: false }) umList: UmManageListComponent;

  MODE = MODE;

  get service(): UmService {
    return this.store['um'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).umm = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      if (this.service.UM_INFO) {
        const doMODE = this.service.UM_INFO !== undefined ? this.service.UM_INFO.MODE : undefined;
        switch (doMODE) {
          case MODE.ADD:
            this.service.STATE = this.service.STATE_PAGE.ADD;
            break;
          case MODE.EDIT:
            this.service.STATE = this.service.STATE_PAGE.EDIT;
            break;
          case MODE.DELETE:
            this.service.UM_INFO = undefined;
            this.service.STATE = this.service.STATE_PAGE.LISTS;
            if (this.umList) {
              this.umList.retrieveData();
            }
            break;
          case MODE.VIEW:
          case MODE.COMPLETE:
          default:
            this.service.STATE = this.service.STATE_PAGE.LISTS;
            break;
        }
      }
    }
  }

  onSelected(item: UM_INFO) {
    this.service.UM_INFO = item;
    this.initMode();
  }

  onComplete() {
    this.service.UM_INFO = undefined;
    this.initMode();
  }

  onBack() {
    this.service.UM_INFO = undefined;
    this.initMode();
  }
}
