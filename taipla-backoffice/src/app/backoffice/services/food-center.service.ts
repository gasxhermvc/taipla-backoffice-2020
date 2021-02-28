import { Injectable } from '@angular/core';
import { BaseService } from '@based/classes/base-service';
import { FoodCenter } from '@app-base/interfaces/food-center-interface';
import { MODE } from '@app/app-base/enums/MODE';
import { AppService } from '@app/based/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class FoodCenterService extends BaseService {
  LISTS: FOOD_CENTER_LIST;
  FOOD_CENTER_INFO: FOOD_CENTER_INFO;

  get app() {
    return this._app;
  }

  constructor(private _app: AppService) {
    super();
  }

  async getFoodCenterLists(params: any) {
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.FOOD_CENTER.FOODS}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data]
        }
        console.log('getFoodCenterLists.response', response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }

    } catch (exception) {
      console.log('getFoodLists.exception', exception);

    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_FOOD_CENTERLISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getFoodCenter(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.FOOD_CENTER.GET_FOOD_CENTER}/${param.FOOD_ID}`, {
        method: 'GET',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('getFoodCenter.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_FOOD_CENTER_EDIT }

    return result;
  }

  async addFoodCenter(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.FOOD_CENTER.CREATED}`, {
        method: 'POST',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;

    } catch (exception) {
      console.log('addFoodCenter.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_FOOD_CENTER_ADD }

    return result;
  }
  async editFoodCenter(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.FOOD_CENTER.UPDATED}`, {
        method: 'PUT',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('editFoodCenter.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_FOOD_CENTER_EDIT };

    return result;
  }

  async deleteFoodCenter(param: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.FOOD_CENTER.DELETED}`, {
        method: 'DELETE',
        headers: this.app.header,
        parameters: param
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('deleteFoodCenter.exception', exception);
    }

    //=>Mock
    // result = MOCK_COUNTRY_DELETE.success
    return result;
  }
}


export interface FOOD_CENTER_LIST {
  LISTS?: Array<FoodCenter>,
  TOTAL?: number;
}


export interface FOOD_CENTER_INFO {
  DATA: FoodCenter,
  MODE: MODE
}
