import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CultureService, CULTURE_INFO } from '@backoffice/services/culture.service';
import { MODE } from '@app-base/enums/MODE';
import { CultureManageListComponent } from '@backoffice/culture/components/culture-manage/components/culture-manage-list/culture-manage-list.component';

@Component({
  selector: 'app-culture-manage',
  templateUrl: './culture-manage.component.html',
  styleUrls: ['./culture-manage.component.scss']
})
export class CultureManageComponent extends BaseClass implements OnInit {

  @ViewChild(CultureManageListComponent) ctList: CultureManageListComponent;

  MODE = MODE;

  get service(): CultureService {
    return this.store['culture'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).ct = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.CULTURE_INFO !== undefined ? this.service.CULTURE_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.CULTURE_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.ctList) {
            this.ctList.retrieveData();
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


  onSelected(item: CULTURE_INFO) {
    this.service.CULTURE_INFO = item;
    this.initMode();
  }

  onComplete() {
    this.service.CULTURE_INFO = undefined;
    this.initMode();
  }

  onBack() {
    this.service.CULTURE_INFO = undefined;
    this.initMode();
  }
}
