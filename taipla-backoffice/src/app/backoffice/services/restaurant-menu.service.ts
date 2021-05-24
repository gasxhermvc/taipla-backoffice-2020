import { Injectable } from "@angular/core";
import { BaseService } from "@based/classes/base-service";
import { RestaurantMenu } from "@app-base/interfaces/restaurant-menu-interface";
import { MODE } from "@app-base/enums/MODE";
import { AppService } from "@based/services/app.service";

@Injectable({
  providedIn: "root",
})
export class RestaurantMenuService extends BaseService {
  LISTS: RESTAURANT_MENU_LIST;
  RESTAURANT_MENU_INFO: RESTAURANT_MENU_INFO;

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

  async getRestaurantMenuLists(params: any) {
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.RESTAURANT_MENUS}`,
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
        console.log("getRestaurantMenuLists.response", response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }
    } catch (exception) {
      console.log("getFoodLists.exception", exception);
    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_RESTAURANT_MENULISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getRestaurantMenu(params: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.GET_RESTAURANT_MENU}`,
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
      console.log("getRestaurantMenu.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_MENU_EDIT }

    return result;
  }

  async addRestaurantMenu(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.CREATED}`,
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
      console.log("addRestaurantMenu.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_MENU_ADD }

    return result;
  }
  async editRestaurantMenu(param: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.UPDATED}`,
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
      console.log("editRestaurantMenu.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_RESTAURANT_MENU_EDIT };

    return result;
  }

  async deleteRestaurantMenu(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.DELETED}`,
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
      console.log("deleteRestaurantMenu.exception", exception);
    }

    //=>Mock
    // result = MOCK_COUNTRY_DELETE.success
    return result;
  }

  async mediaRestaurantMenu(param: any) {
    let result;

    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.RESTAURANT_MENU.MEDIAS}/${param.RESTAURANT_MENU_ID}`,
          {
            method: "GET",
            headers: this.app.header,
            parameters: param,
          }
        )
        .toPromise();

      result = response && response.success ? response : undefined;
    } catch (exception) {
      console.log("mediaRestaurantMenu.exception", exception);
    }

    return result;
  }
}

export interface RESTAURANT_MENU_LIST {
  LISTS?: Array<RestaurantMenu>;
  TOTAL?: number;
}

export interface RESTAURANT_MENU_INFO {
  DATA: RestaurantMenu;
  MODE: MODE;
}
