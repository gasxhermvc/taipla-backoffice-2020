import { Injectable } from '@angular/core';
import { BaseService } from '@based/classes/base-service';
import { AppService } from '@based/services/app.service';
import { Category } from '@app-base/interfaces/category-interface';
import { MODE } from '@app-base/enums/MODE';
import { MOCK_CATEGORY_LISTS } from '@based/mocks/category/mock_category_lists';
import { MOCK_CATEGORY_ADD } from '@based/mocks/category/mock_category_add';
import { MOCK_CATEGORY_EDIT } from '@based/mocks/category/mock_category_edit';
import { MOCK_CATEGORY_DELETE } from '@based/mocks/category/mock_category_delete';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  LISTS: CATEGORY_LIST;
  CATEGORY_INFO: CATEGORY_INFO;

  constructor(private app: AppService) {
    super();
  }

  async getCategoryLists(params: any) {
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
      console.log('getCategoryLists.reponse', response);

    } catch{ }

    //=>Mock
    const LISTS = [].concat(...MOCK_CATEGORY_LISTS);
    this.LISTS = {
      TOTAL: LISTS.length,
      LISTS: LISTS,
    }

    return this.LISTS;
  }

  async getCategory(param: any) {
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
      console.log('getCategory.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_CATEGORY_EDIT };

    return result
  }

  async addCategory(param: any) {
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
      console.log('addCategory.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_CATEGORY_ADD };

    return result;
  }

  async editCategory(param: any) {
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
      console.log('editCategory.exception', exception);
    }

    //=>Mock
    result = { ...MOCK_CATEGORY_EDIT };

    return result;
  }

  async deleteCategory(param: any) {
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
      console.log('deleteCategory.exception', exception);
    }

    //=>Mock
    result = MOCK_CATEGORY_DELETE.success

    return result;
  }
}

export interface CATEGORY_LIST {
  LISTS?: Array<Category>,
  TOTAL?: number
}

export interface CATEGORY_INFO {
  DATA: Category,
  MODE: MODE
}