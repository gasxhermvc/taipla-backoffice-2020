import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { PromotionService } from '@app/backoffice/services/promotion.service';
import { BaseClass } from '@based/classes/base-class';
import { PromotionManageListComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-list/promotion-manage-list.component';
import { PROMOTION_INFO } from '@app/backoffice/services/promotion.service';

@Component({
  selector: 'app-promotion-manage',
  templateUrl: './promotion-manage.component.html',
  styleUrls: ['./promotion-manage.component.scss']
})
export class PromotionManageComponent extends BaseClass implements OnInit {

  @ViewChild(PromotionManageListComponent) pmLists: PromotionManageListComponent;

  MODE = MODE;

  get service(): PromotionService {
    return this.store['promotion'];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
    (window as any).ct = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.PROMOTION_INFO !== undefined ? this.service.PROMOTION_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.selected.emit(true);
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.selected.emit(true);
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.selected.emit(false);
          this.service.PROMOTION_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.pmLists) {
            this.pmLists.retrieveData();
          }
          break;
        case MODE.VIEW:
        case MODE.COMPLETE:
        default:
          this.selected.emit(false);
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          break;
      }
    } else {
      this.service.STATE = this.service.STATE_PAGE.LISTS;
    }
  }


  onSelected(item: PROMOTION_INFO) {
    this.service.PROMOTION_INFO = item;
    this.initMode();
  }

  onComplete() {
    const doMODE = this.service.PROMOTION_INFO !== undefined ? this.service.PROMOTION_INFO.MODE : undefined;
    switch (doMODE) {
      case MODE.ADD:
        this.service.STATE = this.service.STATE_PAGE.EDIT;
        this.service.PROMOTION_INFO.MODE = MODE.EDIT;
        break;
      default:
        break;
    }
    this.initMode();
  }

  onBack() {
    this.service.PROMOTION_INFO = undefined;
    this.initMode();
  }
}
