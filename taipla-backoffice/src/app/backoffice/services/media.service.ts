import { Injectable } from '@angular/core';
import { MODE } from '@app/app-base/enums/MODE';
import { Media } from '@app/app-base/interfaces/media-interface';
import { BaseService } from '@app/based/classes/base-service';
import { AppService } from '@app/based/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends BaseService {
  LISTS: MEDIA_LIST;
  MEDIA_INFO: MEDIA_INFO;

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

  async getMediaLists(params: any) {
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.MEDIA.MEDIAS}`,
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
          LISTS: [].concat(...response.data).map((item: any, index: number) => {

            return {
              ROWNO: (index + 1),
              EXPAND: false,
              ...item
            }
          }),
        };
        console.log("getMediaLists.response", response);
      } else {
        this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
      }
    } catch (exception) {
      console.log("getMediaLists.exception", exception);
    }

    //=>Mock
    // const LISTS = [].concat(...MOCK_MEDIALISTS);
    // this.LISTS = {
    //   TOTAL: LISTS.length,
    //   LISTS: LISTS,
    // }

    return this.LISTS;
  }
  async getMedia(params: any) {
    let result;
    try {
      const response = await this.app
        .reqUrl(
          `${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.MEDIA.GET_MEDIA}/${params.FOOD_ID}`,
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
      console.log("getMedia.exception", exception);
    }

    //=>Mock
    // result = { ...MOCK_MEDIA_EDIT }

    return result;
  }
}

export interface MEDIA_LIST {
  LISTS?: Array<Media>;
  TOTAL?: number;
}

export interface MEDIA_INFO {
  DATA: Media;
  MODE: MODE;
}
