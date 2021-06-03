import { Injectable } from '@angular/core';
import { BaseService } from '@based/classes/base-service';
import { AppService } from '@based/services/app.service';
import { Culture } from '@app-base/interfaces/culture-interface';
import { MODE } from '@app-base/enums/MODE';
import { MOCK_CULTURE_LISTS } from '@based/mocks/culture/mock_culture_lists';
import { MOCK_CULTURE_ADD } from '@based/mocks/culture/mock_culture_add';
import { MOCK_CULTURE_EDIT } from '@based/mocks/culture/mock_culture_edit';
import { MOCK_CULTURE_DELETE } from '@based/mocks/culture/mock_culture_delete';

@Injectable({
  providedIn: 'root'
})
export class CultureService extends BaseService {
  LISTS: CULTURE_LIST;
  CULTURE_INFO: CULTURE_INFO;

  get app() {
    return this._app;
  }

  constructor(private _app: AppService) {
    super();
  }

  async getCultureLists(params: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.CULTURE.CULTURES}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [].concat(...response.data).map((item: any, index: number) => {
            return {
              ROWNO: (index + 1),
              EXPAND: false,
              ...item
            }
          })
        };
        console.log('getCultureLists.response', response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT)
      }


    } catch (exception) {
      console.log('getCultureLists.exception', exception);
    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_CULTURE_LISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }

  async getCulture(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.CULTURE.GET_CULTURE}/${param.COUNTRY_ID}/${param.CULTURE_ID}`, {
        method: 'GET',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('getCulture.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_CULTURE_EDIT };

    return result
  }

  async addCulture(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.CULTURE.CREATED}`, {
        method: 'POST',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;

    } catch (exception) {
      console.log('addCulture.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_CULTURE_ADD };

    return result;
  }

  async editCulture(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.CULTURE.UPDATED}`, {
        method: 'PUT',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('editCulture.exception', exception);
    }

    //=>Mock
    // result = { ...MOCK_CULTURE_EDIT };

    return result;
  }

  async deleteCulture(param: any) {
    let result;

    try {

      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.CULTURE.DELETED}`, {
        method: 'DELETE',
        headers: this.app.header,
        parameters: param
      }, false).toPromise();

      result = response && response.success ? response : undefined;

    } catch (exception) {
      console.log('deleteCulture.exception', exception);
    }

    //=>Mock
    // result = MOCK_CULTURE_DELETE.success

    return result;
  }
}

export interface CULTURE_LIST {
  LISTS?: Array<Culture>,
  TOTAL?: number
}

export interface CULTURE_INFO {
  DATA: Culture,
  MODE: MODE
}
