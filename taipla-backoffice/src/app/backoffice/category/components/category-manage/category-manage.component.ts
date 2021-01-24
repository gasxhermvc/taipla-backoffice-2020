import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CategoryService, CATEGORY_INFO } from '@backoffice/services/category.service';
import { MODE } from '@app-base/enums/MODE';
import { CategoryManageListComponent } from '@backoffice/category/components/category-manage/components/category-manage-list/category-manage-list.component';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent extends BaseClass implements OnInit {

  @ViewChild(CategoryManageListComponent) cmList: CategoryManageListComponent;

  MODE = MODE;

  get service(): CategoryService {
    return this.store['category'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cm = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }

  private initMode() {
    if (this.service !== undefined) {
      const doMODE = this.service.CATEGORY_INFO !== undefined ? this.service.CATEGORY_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.CATEGORY_INFO = undefined;
          this.service.STATE = this.service.STATE_PAGE.LISTS;
          if (this.cmList) {
            this.cmList.retrieveData();
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

  onSelected(item: CATEGORY_INFO) {
    this.service.CATEGORY_INFO = item;
    this.initMode();
  }

  onComplete() {
    this.service.CATEGORY_INFO = undefined;
    this.initMode();
  }

  onBack() {
    this.service.CATEGORY_INFO = undefined;
    this.initMode();
  }
}
