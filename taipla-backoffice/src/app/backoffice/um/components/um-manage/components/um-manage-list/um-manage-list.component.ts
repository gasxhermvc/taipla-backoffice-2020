import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { UmService } from '@backoffice/services/um.service';
import { MODE } from '@app-base/enums/MODE';
import { SimpleTableConfig, SimpleColumnConfig } from '@based/interfaces/SimpleTableConfig';
import { UM_LIST_CONFIG } from '@based/configs/table-config';
@Component({
  selector: 'app-um-manage-list',
  templateUrl: './um-manage-list.component.html',
  styleUrls: ['./um-manage-list.component.scss']
})
export class UmManageListComponent extends BaseClass implements OnInit {
  public MODE = MODE;

  get service(): UmService {
    return this.store['um'];
  }

  get columns(): any {
    return UM_LIST_CONFIG;
  }

  get items(): any {
    return this.service.LISTS !== undefined ? this.service.LISTS.LISTS : [];
  }

  @Output() selected = new EventEmitter<any>();

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  constructor(injector: Injector) {
    super(injector);

    (window as any).uml = this;
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

        this.service.LISTS = await this.service.getUMLists(params);
        this.hideLoading();
      }
    }
  }

  createUser() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();

        const param: any = {
          USER_ID: item.USER_ID
        };

        const result = await this.service.deleteUser(param);

        if (result) {
          if (result.success) {
            this.app.showSuccess(result.message || this.app.message.SUCCESS.DELETE);
            this.onSelected(item, MODE.DELETE);
          } else {
            this.app.showError(result.message || this.app.message.ERROR.DELETE);
          }
        } else {
          this.app.showError(this.app.message.ERROR.DELETE);
        }
        this.hideLoading();
      }
    });
  }

  onSelected(item: any, mode: MODE = MODE.VIEW) {
    this.selected.emit({
      DATA: item,
      MODE: mode
    });
  }

  getColumnConfig(key: string, useProps: string = '') {
    return this.app.getColumnConfig(UM_LIST_CONFIG, key, useProps)
  }
}
