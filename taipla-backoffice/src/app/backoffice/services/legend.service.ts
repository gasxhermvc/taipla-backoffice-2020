import { Injectable } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { Legend } from '@app/app-base/interfaces/legend-interface';

import { BaseService } from '@app/based/classes/base-service';
import { AppService } from '@app/based/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class LegendService extends BaseService {
  LISTS: LEGEND_LIST;
  LEGEND_INFO: LEGEND_INFO;

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

  async getLegendLists(params: any) {
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.LEGENDS}`,
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
        console.log("getLegendLists.response", response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }
    } catch (exception) {
      console.log("getFoodLists.exception", exception);
    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_LEGENDLISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getLegend(params: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.GET_LEGEND}/${params.CODE}`,
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
      console.log("getLegend.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_LEGEND_EDIT }

    return result;
  }

  async addLegend(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.CREATED}`,
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
      console.log("addLegend.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_LEGEND_ADD }

    return result;
  }
  async editLegend(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.UPDATED}`,
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
      console.log("editLegend.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_LEGEND_EDIT };

    return result;
  }

  async deleteLegend(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.DELETED}`,
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
      console.log("deleteLegend.exception", exception);
    }

    //=>Mock
    // result = MOCK_COUNTRY_DELETE.success
    return result;
  }

  async mediaLegend(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LEGEND.MEDIAS}/${param.LEGEND_ID}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: param,
          }
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("mediaLegend.exception", exception);
    }

    return result;
  }
}

export interface LEGEND_LIST {
  LISTS?: Array<Legend>;
  TOTAL?: number;
}

export interface LEGEND_INFO {
  DATA: Legend;
  MODE: MODE;
}
