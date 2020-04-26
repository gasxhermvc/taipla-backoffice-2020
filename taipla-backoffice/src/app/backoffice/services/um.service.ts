import { Injectable } from '@angular/core';
import { AppService } from '@based/services/app.service';
import { UM } from '@app-base/interfaces/um-interface';
import { MODE } from '@app-base/enums/MODE';
import { STATE_PAGE } from '@app-base/enums/STATE_PAGE';
import { MOCK_UM_LISTS } from '@based/mocks/um/mock_um_lists';
import { MOCK_UM_ADD } from '@based/mocks/um/mock_um_add';
import { MOCK_UM_EDIT } from '@based/mocks/um/mock_um_edit';
import { MOCK_UM_DELETE } from '@based/mocks/um/mock_um_delete';

@Injectable({
  providedIn: 'root'
})
export class UmService {

  STATE_PAGE = STATE_PAGE;

  STATE: STATE_PAGE;

  LISTS: UM_LIST;
  UM_INFO: UM_INFO;

  constructor(private app: AppService) { }

  async getUMLists() {

    try {
      if (this.LISTS === undefined) {
        const response = await this.app.reqUrl('', {

        }, false).toPromise();

        if (response) {

        }
        console.log('getUMLists.reponse', response);
      }
    } catch{ }

    //=>Mock
    const LISTS = MOCK_UM_LISTS;
    this.LISTS = {
      TOTAL: LISTS.length,
      LISTS: LISTS,
    }

    return this.LISTS;
  }

  async getUser(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl('', param, false).toPromise();

      if (response && response.success) {
        result = response.data;
      }

    } catch (exception) {
      console.log('getUser.exception', exception);
    }

    result = { ...MOCK_UM_EDIT };

    return result;
  }

  async addUser(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl('', param, false).toPromise();

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
      const response = await this.app.reqUrl('', param, false).toPromise();

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
      const response = await this.app.reqUrl('', param, false).toPromise();

      if (response && response.success) {
        result = response.success;
      }
    } catch (exception) {
      console.log('deleteUser.exception', exception);
    }

    result = { ...MOCK_UM_DELETE }

    return result;
  }
}

export interface UM_LIST {
  LISTS?: Array<UM>,
  TOTAL: number
}

export interface UM_INFO {
  DATA: UM,
  MODE: MODE
}