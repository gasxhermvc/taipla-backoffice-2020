import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CountryService, COUNTRY_INFO } from '@backoffice/services/country.service';
import { MODE } from '@app-base/enums/MODE';
import { CountryManageListComponent } from '@backoffice/country/components/country-manage/components/country-manage-list/country-manage-list.component';

@Component({
  selector: 'app-country-manage',
  templateUrl: './country-manage.component.html',
  styleUrls: ['./country-manage.component.scss']
})
export class CountryManageComponent extends BaseClass implements OnInit {

  @ViewChild(CountryManageListComponent) cmList: CountryManageListComponent;

  MODE = MODE;

  get service(): CountryService {
    return this.store['country'];
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
      const doMODE = this.service.COUNTRY_INFO !== undefined ? this.service.COUNTRY_INFO.MODE : undefined;
      switch (doMODE) {
        case MODE.ADD:
          this.service.STATE = this.service.STATE_PAGE.ADD;
          break;
        case MODE.EDIT:
          this.service.STATE = this.service.STATE_PAGE.EDIT;
          break;
        case MODE.DELETE:
          this.service.COUNTRY_INFO = undefined;
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

  onSelected(item: COUNTRY_INFO) {
    this.service.COUNTRY_INFO = item;
    this.initMode();
  }

  onComplete() {
    this.service.COUNTRY_INFO = undefined;
    this.initMode();
  }

  onBack() {
    this.service.COUNTRY_INFO = undefined;
    this.initMode();
  }
}
