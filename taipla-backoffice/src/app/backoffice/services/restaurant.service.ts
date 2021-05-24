import { Injectable } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { Restaurant } from '@app/app-base/interfaces/restaurant-interface';
import { BaseService } from '@app/based/classes/base-service';
import { AppService } from '@app/based/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends BaseService {

  LISTS: RESTAURANT_LIST;
  RESTAURANT_INFO: RESTAURANT_INFO;

  HIDE_TAB: boolean = false;

  //=>Tabs
  tabLoad: any = {
    one: false,
    two: false,
    three: false,
  };

  get app() {
    return this._app;
  }

  constructor(private _app: AppService) {
    super();
  }

  async getRestaurantLists(params: any) {
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.RESTAURANTS}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data]
        }
        console.log('getRestaurantLists.response', response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }

    } catch (exception) {
      console.log('getRestaurantLists.exception', exception);

    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_RESTAURANTLISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getRestaurant(params: any) {
    let result;
    try {

      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.GET_RESTAURANT}/${params.RES_ID}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params,
        responseType: 'json'
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('getRestaurant.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_EDIT }

    return result;
  }

  async addRestaurant(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.CREATED}`, {
        method: 'POST',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;

    } catch (exception) {
      console.log('addRestaurant.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_ADD }

    return result;
  }
  async editRestaurant(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.UPDATED}`, {
        method: 'PUT',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('editRestaurant.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_EDIT };

    return result;
  }

  async deleteRestaurant(param: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.DELETED}`, {
        method: 'DELETE',
        headers: this.app.header,
        parameters: param
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('deleteRestaurant.exception', exception);
    }

    //=>Mock
    // result = MOCK_COUNTRY_DELETE.success
    return result;
  }

  async mediaRestaurant(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT.MEDIAS}/${param.RES_ID}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: param,
          }
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("mediaRestaurant.exception", exception);
    }

    return result;
  }
}


export interface RESTAURANT_LIST {
  LISTS?: Array<Restaurant>,
  TOTAL?: number;
}


export interface RESTAURANT_INFO {
  DATA: Restaurant,
  MODE: MODE
}
