import { Injectable } from '@angular/core';
import { BaseService } from '@based/classes/base-service';
import { AppService } from '@based/services/app.service';
import { Country } from '@app-base/interfaces/country-interface';
import { MODE } from '@app-base/enums/MODE';
import { MOCK_COUNTRY_LISTS } from '@based/mocks/country/mock_country_lists';
import { MOCK_COUNTRY_ADD } from '@based/mocks/country/mock_country_add';
import { MOCK_COUNTRY_EDIT } from '@based/mocks/country/mock_country_edit';
import { MOCK_COUNTRY_DELETE } from '@based/mocks/country/mock_country_delete';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService {
  LISTS: COUNTRY_LIST;
  COUNTRY_INFO: COUNTRY_INFO;

  constructor(private app: AppService) {
    super();
  }

  async getCountryLists(params: any) {
    try {
      const response = await this.app.reqUrl('', {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: params
      }, false).toPromise();

      if (response && response.success) {
        this.LISTS = {
          TOTAL: response.data.length,
          LISTS: [...response.data]
        }
      }
      console.log('getCountryLists.reponse', response);

    } catch{ }

    //=>Mock
    const LISTS = [].concat(...MOCK_COUNTRY_LISTS);
    this.LISTS = {
      TOTAL: LISTS.length,
      LISTS: LISTS,
    }

    return this.LISTS;
  }

  async getCountry(param: any) {
    let result;
    try {
      const response = await this.app.reqUrl('', {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.data && response.data.length > 0 ? response.data[0] : undefined;
      }

    } catch (exception) {
      console.log('getCountry.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_COUNTRY_EDIT };

    return result
  }

  async addCountry(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl('', {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.data && response.data.length > 0 ? response.data[0] : undefined;
      }

    } catch (exception) {
      console.log('addCountry.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_COUNTRY_ADD };

    return result;
  }

  async editCountry(param: any) {
    let result;
    try {

      const response = await this.app.reqUrl('', {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.data && response.data.length > 0 ? response.data[0] : undefined;
      }

    } catch (exception) {
      console.log('editCountry.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_COUNTRY_EDIT };

    return result;
  }

  async deleteCountry(param: any) {
    let result;

    try {

      const response = await this.app.reqUrl('', {
        method: 'POST',
        headers: { ...this.app.header },
        parameters: param
      }, false).toPromise();

      if (response && response.success) {
        result = response.success;
      }

    } catch (exception) {
      console.log('deleteCountry.exception', exception);
    }

    //=>Mock
    result = MOCK_COUNTRY_DELETE.success

    return result;
  }
}

export interface COUNTRY_LIST {
  LISTS?: Array<Country>,
  TOTAL?: number
}

export interface COUNTRY_INFO {
  DATA: Country,
  MODE: MODE
}