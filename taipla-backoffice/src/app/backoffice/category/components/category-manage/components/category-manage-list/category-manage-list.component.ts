import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CategoryService } from '@backoffice/services/category.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-category-manage-list',
  templateUrl: './category-manage-list.component.html',
  styleUrls: ['./category-manage-list.component.scss']
})
export class CategoryManageListComponent extends BaseClass implements OnInit {

  public MODE = MODE;

  get service(): CategoryService {
    return this.store['category'];
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);

    (window as any).cml = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.STATE) {
      setTimeout(() => {
        this.retrieveData();
      }, 0);
    }
  }

  async retrieveData() {
    if (this.service !== undefined) {
      if (this.service.STATE === this.service.STATE_PAGE.LISTS) {
        this.showLoading();
        const params: any = {};
        this.service.LISTS = await this.service.getCategoryLists(params);
        this.hideLoading();
      }
    }
  }

  createCategory() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();
        let params: any = {
          categoryLists: [{}]
        };

        const result = await this.service.deleteCategory(params);

        if (result) {
          this.app.showSuccess(this.app.message.SUCCESS.DELETE);
          this.onSelected(item, MODE.DELETE);
        } else {
          this.app.showError(this.app.message.ERROR.DELETE);
        }
        this.hideLoading();
      }
    })
  }

  onSelected(item: any, mode: MODE = MODE.VIEW) {
    this.selected.emit({
      ITEM: item,
      MODE: mode
    });
  }

}
