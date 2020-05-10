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

  constructor(private app: AppService) {
    super();
  }

  async getUMLists(params: any) {
    try {
      const response = await this.app.reqUrl(`${this.app.baseApi}/user/getUser`, {
        method: 'POST',
        headers: {
          ...this.app.header
        },
        parameters: params
      }, false).toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data]
        };
        console.log('getUMLists.response', response);
      }
    } catch{ }

    //=>Mock
    const LISTS = [].concat(...MOCK_UM_LISTS);
    this.LISTS = {
      TOTAL: LISTS.length,
      LISTS: LISTS,
    }

    return this.LISTS;
  }

  async getUser(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl(`${this.app.baseApi}/user/getUser`, {
        method: 'POST',
        headers: {
          ...this.app.header
        },
        parameters: {
          search: {
            client_id: param.client_id,
            role: ''
          }
        }
      }, false).toPromise();

      if (response && response.success) {
        result = response.data && response.data.length > 0 ? response.data[0] : undefined;
      }

    } catch (exception) {
      console.log('getUser.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_UM_EDIT };

    return result;
  }

  async addUser(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl(`${this.app.baseApi}/user/addUser`, {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.data;
      }

    } catch (exception) {
      console.log('addUser.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_UM_ADD };

    return result;
  }

  async editUser(param: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.baseApi}/user/editUser`, {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.data;
      }

    } catch (exception) {
      console.log('editUser.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_UM_EDIT };

    return result;
  }

  async deleteUser(param: any) {
    let result;

    try {
      const response = await this.app.reqUrl(`${this.app.baseApi}/user/deleteUser`, {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.success;
      }
    } catch (exception) {
      console.log('deleteUser.exception', exception);
    }

    //=>Mock
    result = MOCK_UM_DELETE.success

    return result;
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