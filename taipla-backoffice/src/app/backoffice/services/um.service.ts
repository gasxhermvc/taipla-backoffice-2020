import { Injectable } from '@angular/core';
import { BaseService } from '@based/classes/base-service';
import { AppService } from '@based/services/app.service';
import { UM } from '@app-base/interfaces/um-interface';
import { MODE } from '@app-base/enums/MODE';
import { MOCK_UM_LISTS } from '@based/mocks/um/mock_um_lists';
import { MOCK_UM_ADD } from '@based/mocks/um/mock_um_add';
import { MOCK_UM_EDIT } from '@based/mocks/um/mock_um_edit';
import { MOCK_UM_DELETE } from '@based/mocks/um/mock_um_delete';

@Injectable({
  providedIn: 'root'
})
export class UmService extends BaseService {
  LISTS: UM_LIST;
  UM_INFO: UM_INFO;

  get app() {
    return this._app;
  }

  constructor(private _app: AppService) {
    super();
  }

  async getUMLists(params: any) {
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.UM.USERS}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();
      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data]
        };
        console.log('getUMLists.response', response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }
    } catch (exception) {
      console.log('getUMLists.exception', exception);
    }
    //=>Mock
    // const LISTS = [].concat(...MOCK_UM_LISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }

  async getUser(params: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.UM.GET_USER}/${params.USER_ID}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();
      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('getUser.exception', exception);
    }
    //=>Mock
    // result = { ...MOCK_UM_EDIT };

    return result;
  }

  async addUser(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.UM.CREATED}`, {
        method: 'POST',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();
      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('addUser.exception', exception);
    }
    //=>Mock
    // result = { ...MOCK_UM_ADD };

    return result;
  }

  async editUser(param: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.UM.UPDATED}`, {
        method: 'PUT',
        headers: this.app.headerFormData,
        parameters: this.app.formData(param)
      }, false).toPromise();
      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('editUser.exception', exception);
    }
    //=>Mock
    // result = { ...MOCK_UM_EDIT };

    return result;
  }

  async deleteUser(params: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.UM.DELETED}`, {
        method: 'DELETE',
        headers: this.app.header,
        parameters: params
      }, false).toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log('deleteUser.exception', exception);
    }
    //=>Mock
    // result = MOCK_UM_DELETE.success

    return result;
  }

  async roleLut() {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.LUT.ROLE}`, {
        method: 'GET',
        headers: this.app.header,
        parameters: {}
      }, false).toPromise();

      result = response && response.success ? response : [];
    } catch (exception) {
      console.log('roleLut.exception', exception);
    }

    return result || [];
  }
}

export interface UM_LIST {
  LISTS?: Array<UM>,
  TOTAL?: number
}

export interface UM_INFO {
  DATA: UM,
  MODE: MODE
}