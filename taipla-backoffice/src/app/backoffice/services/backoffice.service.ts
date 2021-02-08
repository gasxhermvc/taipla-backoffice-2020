import { Injectable, Injector, Output, EventEmitter } from '@angular/core';
import { BaseRequest } from '@based/classes/base-request';
import { DashboardService } from '@backoffice/services/dashboard.service';
import { UmService } from '@backoffice/services/um.service';
import { CountryService } from '@app/backoffice/services/country.service';
import { FoodCenterService } from '@backoffice/services/food-center.service';
import { MediaService } from '@backoffice/services/media.service';
import { RestaurantService } from '@backoffice/services/restaurant.service';
import { AccountService } from '@backoffice/services/account.service';

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
    { key: 'food_center', class: FoodCenterService },
    { key: 'media', class: MediaService },
    { key: 'restaurant', class: RestaurantService },
    { key: 'account', class: AccountService },
  ];

  private lookupList = [
    'ROLES',
  ];
  private lookup: any = {}

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
    this.init();
  }

  private async init() {
    console.log('backoffice.service.init');

    this.autoMapperInjection();
    // setTimeout(() => {
    //   this.isLoaded.emit(true);
    // }, 2000);
    const reqLookup = await Promise.all(this.lookupList.map(async (LUT) => {
      return await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/lut/${LUT}`, {
        method: 'GET',
        headers: this.app.headerFormData,
        parameters: {}
      }, false).toPromise()
    }));
    this.lookupList.forEach((it, i) => { this.lookup[`${it}`] = reqLookup[i].data; });
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
}
