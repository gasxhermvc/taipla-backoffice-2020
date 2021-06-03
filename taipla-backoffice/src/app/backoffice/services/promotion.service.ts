import { Injectable } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { Promotion } from '@app/app-base/interfaces/promotion-interface';

import { BaseService } from '@app/based/classes/base-service';
import { AppService } from '@app/based/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends BaseService {
  LISTS: PROMOTION_LIST;
  PROMOTION_INFO: PROMOTION_INFO;

  RES_ID: any;
  
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

  async getPromotionLists(params: any) {
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.PROMOTIONS}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: params,
          },
          false
        )
        .toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data],
        };
        console.log("getPromotionLists.response", response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }
    } catch (exception) {
      console.log("getFoodLists.exception", exception);
    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_PROMOTIONLISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getPromotion(params: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.GET_PROMOTION}/${params.CODE}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: params,
            responseType: "json",
          },
          false
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("getPromotion.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_PROMOTION_EDIT }

    return result;
  }

  async addPromotion(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.CREATED}`,
          {
            method: "POST",
            headers: this.app.headerFormData,
            parameters: this.app.formData(param),
          },
          false
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("addPromotion.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_PROMOTION_ADD }

    return result;
  }
  async editPromotion(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.UPDATED}`,
          {
            method: "PUT",
            headers: this.app.headerFormData,
            parameters: this.app.formData(param),
          },
          false
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("editPromotion.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_PROMOTION_EDIT };

    return result;
  }

  async deletePromotion(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.DELETED}`,
          {
            method: "DELETE",
            headers: this.app.header,
            parameters: param,
          },
          false
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("deletePromotion.exception", exception);
    }

    //=>Mock
    // result = MOCK_COUNTRY_DELETE.success
    return result;
  }

  async mediaPromotion(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.PROMOTION.MEDIAS}/${param.PROMOTION_ID}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: param,
          }
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("mediaPromotion.exception", exception);
    }

    return result;
  }
}

export interface PROMOTION_LIST {
  LISTS?: Array<Promotion>;
  TOTAL?: number;
}

export interface PROMOTION_INFO {
  DATA: Promotion;
  MODE: MODE;
}
