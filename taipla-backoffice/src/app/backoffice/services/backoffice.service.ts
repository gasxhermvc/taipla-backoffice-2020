import { Injectable, Injector, Output, EventEmitter } from '@angular/core';
import { BaseRequest } from '@based/classes/base-request';
import { DashboardService } from '@backoffice/services/dashboard.service';
import { UmService } from '@backoffice/services/um.service';
import { CountryService } from '@backoffice/services/country.service';
import { CultureService } from '@backoffice/services/culture.service';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { MediaService } from '@backoffice/services/media.service';
import { RestaurantService } from '@backoffice/services/restaurant.service';
import { AccountService } from '@backoffice/services/account.service';
import { LegendService } from '@backoffice/services/legend.service';
import { RestaurantMenuService } from '@backoffice/services/restaurant-menu.service';
import { PromotionService } from '@backoffice/services/promotion.service';

import { MENU } from '@app/app-base/interfaces/menu-config';
import { combineLatest, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BackofficeService extends BaseRequest {

  public loading: boolean = false;
  private _loaded: boolean = false;
  private injections: any = [
    { key: 'dashboard', class: DashboardService },
    { key: 'um', class: UmService },
    { key: 'country', class: CountryService },
    { key: 'culture', class: CultureService },
    { key: 'food_center', class: FoodCenterService },
    { key: 'media', class: MediaService },
    { key: 'restaurant', class: RestaurantService },
    { key: 'account', class: AccountService },
    { key: 'legend', class: LegendService },
    { key: 'restaurant_menu', class: RestaurantMenuService },
    { key: 'promotion', class: PromotionService },
  ];

  public menus: MENU[] = undefined;

  get MENUS() {
    return this.menus && this.menus.length > 0 ? this.menus : [];
  }

  private lookupList = [
    'ROLES',
    'COUNTRIES',
    'CULTURES',
    'LEGEND-TYPES',
    'OWNERS',
    'STAFF',
    'PROMOTION-TYPES',
    'AUTHOR-CREATE-RESTAURANT',
    'AUTHOR-CREATE-FOOD-CENTER',
    'PROVINCES'
  ];
  lookup: any = undefined;

  @Output() public isLoaded = new EventEmitter<any>();

  _currentSystem: string = 'dashboard';

  set currentSystem(current: any) {
    if (current && current !== '') {
      setTimeout(() => {
        this._currentSystem = current;
      }, 0);
    }
  }

  get currentSystem() {
    return this._currentSystem || 'dashboard';
  }

  service: any = {};

  get loaded(): boolean {
    return this._loaded;
  }

  set loaded(loaded: boolean) {
    if (loaded !== undefined && loaded !== null) {
      this._loaded = loaded;
    }
  }

  constructor(private injector: Injector) {
    super(injector);
    // this.init();
  }

  public async reloadLookup(keys: any) {
    const reqLookup: any = await Promise.all([].concat(...keys).map(async (LUT) => {
      return await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/lut/${LUT}`, {
        method: 'GET',
        headers: this.app.headerFormData,
        parameters: {}
      }, false).toPromise()
    }));

    if (reqLookup && reqLookup.success) {
      this.lookup[keys] = reqLookup[0] && reqLookup[0].data;
    }
  }

  init() {
    console.log('backoffice.service.init');

    this.autoMapperInjection();
    // setTimeout(() => {
    //   this.isLoaded.emit(true);
    // }, 2000);
    if (!this.lookup) {
      this.lookup = {};
      const reqLookup = Promise.all(this.lookupList.map(async (LUT) => {
        return await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/lut/${LUT}`, {
          method: 'GET',
          headers: this.app.header,
          parameters: {}
        }, false).toPromise()
      }));

      reqLookup.then((lookupList: any) => {
        this.lookupList.forEach((it, i) => { this.lookup[`${it}`] = lookupList[i].data; });
      })
    }
  }

  init2(): Observable<any> {
    const subject = new Subject<any>();

    this.autoMapperInjection();

    if (!this.lookup) {
      this.lookup = {};
      let reqLookup: Array<Observable<any>> = this.lookupList.map((LUT: any) => {
        return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/lut/${LUT}`, {
          method: 'GET',
          headers: this.app.header,
          parameters: {}
        }, false)
      });

      combineLatest(reqLookup).subscribe((lookupList: any) => {
        this.lookupList.forEach((it, i) => { this.lookup[`${it}`] = lookupList[i].data; });
        subject.next(true);
      }, (error: any) => {
        subject.next(false);
      }, () => {
        subject.complete()
      });
    } else {
      setTimeout(() => {
        subject.next(true);
        subject.complete();
      }, 0);
    }

    return subject.asObservable();
  }

  private async autoMapperInjection() {
    this.injections.map((inject: any) => {
      if (this.service[inject.key] === undefined) {
        this.service[inject.key] = this.injector.get(inject.class);
      }
    });
  }

  getLookup(key: string): any[] {
    return this.lookup[`${key}`] || [];
  }

  //=>ใช้กับการอัพเดต Lat-Long จาก Event draw-point
  afterRender(evt: any, form: any, key: any = { LAT: 'LAT', LONG: 'LONG' }, decimalPlaces: number = 6) {
    form.setFormData({
      [`${key.LAT}`]: this.formatDecimal(evt['LAT'], decimalPlaces),
      [`${key.LONG}`]: this.formatDecimal(evt['LONG'], decimalPlaces)
    });
  }

  formatDecimal(value: number, decimalPlaces?: number) {
    if (value === null) {
      return value;
    }

    if (decimalPlaces) {
      return Number(value).toFixed(decimalPlaces);
    }

    return value;
  }

  setVariableToService(name: string, value: any) {
    this.injections.forEach((inject: any) => {
      if (this.service[inject.key] !== undefined) {
        this.service[inject.key][name] = value;
      }
    });
  }
}
