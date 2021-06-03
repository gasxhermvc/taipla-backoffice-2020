import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CultureService } from '@backoffice/services/culture.service';
import { MODE } from '@app-base/enums/MODE';
import { CULTURE_LIST_CONFIG } from '@based/configs/table-config';

@Component({
  selector: 'app-culture-manage-list',
  templateUrl: './culture-manage-list.component.html',
  styleUrls: ['./culture-manage-list.component.scss']
})
export class CultureManageListComponent extends BaseClass implements OnInit {

  public MODE = MODE;

  get service(): CultureService {
    return this.store['culture'];
  }

  get columns(): any {
    return CULTURE_LIST_CONFIG;
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
        this.service.LISTS = await this.service.getCultureLists(params);
        this.hideLoading();
      }
    }
  }

  createCulture() {
    this.onSelected({}, MODE.ADD);
  }

  onDelete(item: any) {
    this.app.showConfirm(this.app.message.CONFIRM.DELETE, async (ok: any) => {
      if (ok) {
        this.showLoading();
        let param: any = {
          COUNTRY_ID: item.COUNTRY_ID,
          CULTURE_ID: item.CULTURE_ID
        };

        const result = await this.service.deleteCulture(param);

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
    })
  }

  onSelected(item: any, mode: MODE = MODE.VIEW) {
    this.selected.emit({
      DATA: item,
      MODE: mode
    });
  }
  getColumnConfig(key: string, useProps: string = '') {
    return this.app.getColumnConfig(CULTURE_LIST_CONFIG, key, useProps)
  }
}
