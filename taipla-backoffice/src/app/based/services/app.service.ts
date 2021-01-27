import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '@environments/environment';

//=>Libraries
// import { NzModalModule } from 'ng-zorro-antd/modal';
// import { NzMessageModule } from 'ng-zorro-antd/message';

//=>App
import { environment } from '@environments/environment';
import message from "@assets/messages/message.json";
import { ROUTE } from '@app-base/config/routes';
import { XHttpOptions } from '@based/interfaces/HttpOptions';
import { User, JsonWebToken } from '@app-base/interfaces/default-interface';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  env: any = environment;
  message: any = message;
  route: any = ROUTE;
  jwt: JsonWebToken;

  private _loading: boolean = false;

  get hostName(): string {
    return document.getElementsByTagName("base")[0].href;
  }

  get apiUrl(): string {
    return this.env.api.baseUrl._trim('/');
  }

  get apiVersion(): string {
    return this.env.api.version;
  }

  get user(): User {
    return (this.jwt && this.jwt.payload) ? this.jwt.payload : undefined;
  }

  get header() {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.jwt.access_token}`
    }
  }

  get headerFormData() {
    return {
      'Content-Type': "multipart/form-data",
      'Authorization': `Bearer ${this.jwt.access_token}`
    }
  }

  get headerUrlEncode() {
    return {
      'Content-Type': undefined,
      'Authorization': `Bearer ${this.jwt.access_token}`
    }
  }

  constructor(private http: HttpClient,
    private msg: NzMessageService,
    private modalService: NzModalService) { }

  reqUrl(url: string, httpOptions: XHttpOptions, alert: boolean = true): Observable<any> {
    let req;

    if (httpOptions && httpOptions.method === undefined) {
      httpOptions.method = 'get';
    } else {
      httpOptions.method = httpOptions.method.toLowerCase();
    }

    if (this.isInternalUrl(url)) {
      req = this._reqInternalUrl(url, httpOptions);
    } else {
      req = this._reqExternalUrl(url, httpOptions);
    }
    return req.pipe(map((response: any) => {
      if (response === null || response === undefined) {
        if (alert) {
          this.showDefaultError();
        }
      }
      return response;
    }));
  }

  formData(parameters) {
    var formData: any = new FormData();

    Object.keys(parameters).forEach((key) => {
      formData.append(key, parameters[key]);

      if (key === 'UPLOAD') {
        //=>Single
        parameters[key].forEach((file) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else if (key === 'UPLOADS') {
        //=>Multiple
        parameters[key].forEach((file, index) => {
          if (file instanceof File) {
            formData.append(`${key}[${index}]`, file);
          }
        });
      }
    });

    return formData;
  }

  /* Loading */
  get isShowLoading(): boolean {
    return this._loading;
  }

  showLoading() {
    console.log('app.show.loading');
    setTimeout(() => {
      this._loading = true;
    }, 0);
  }

  hideLoading() {
    console.log('app.hide.loading');
    setTimeout(() => {
      this._loading = false;
    }, 0);
  }

  /* Private */
  private _reqInternalUrl(url: string, options: XHttpOptions): Observable<any> {
    const domainName = env.api.baseUrl;
    const combineUrl = domainName + "/" + (url.startsWith('/') ? url.substring(1).trim() : url.trim());

    if (options && options.headers !== undefined) {
      options.headers = {
        "Content-Type": this.getContentType(options),
        ...options.headers
      }
    }

    return this._reqUrl(combineUrl, options);
  }

  private _reqExternalUrl(url: string, options: XHttpOptions): Observable<any> {

    if (options && options.headers !== undefined) {
      options.headers = {
        "Content-Type": this.getContentType(options),
        ...options.headers
      }
    }

    return this._reqUrl(url, options);
  }

  private _reqUrl(url: string, options: XHttpOptions): Observable<any> {
    let req;

    let headers = new HttpHeaders();
    let isMultipart = false;
    let formData: FormData;

    if (options && options.headers) {
      Object.keys(options.headers).forEach(key => {
        if (key.toLowerCase() === 'content-type' && options.headers[key] && options.headers[key].indexOf('form-data')) {
          delete options.headers[key];
          isMultipart = true;
          formData = options.parameters;
        } else {
          headers = headers.append(key, options.headers[key]);
        }
      });
    }

    let params: any;
    if (isMultipart) {
      params = formData;
    } else {
      params = this.buildParams(options);
    }

    switch (options.method) {
      case "get":
        req = this.http.get(url, {
          headers: headers,
          params: { ...params }
        });
        break;

      case "post":
        req = this.http.post(url, params, {
          headers: headers
        });
        break;

      case "put":
        req = this.http.put(url, params, {
          headers: headers
        });
        break;

      case "delete":
        req = this.http.delete(url, {
          headers: headers,
          params: { ...params }
        });
        break;

      default:
        req = this.http.get(url, {
          headers: headers,
          ...params
        });

        break;
    }

    return req;
  }

  private buildParams(options: any): any {
    let params = {};
    switch (options.method) {
      case "get":
      case "delete":
        params = (options.parameters && Object.keys(options.parameters).length > 0) ? { params: options.parameters } : {};
        break;
      default:
        params = (options.parameters && Object.keys(options.parameters).length > 0) ? { ...options.parameters } : {};
        break;
    }
    return params;
  }

  private getContentType(options: any): string {
    let contentType: string = '';

    switch (options.json) {
      case undefined:
      case true:
        contentType = "application/json; charset=utf8";
        break;
      default:
        contentType = "application/x-www-form-urlencoded; charset=utf8";
        break;
    }

    return contentType;
  }

  /* Support */
  toJsonObject(jsonString: string) {
    return JSON.parse(jsonString);
  }

  toJsonString(jsonObject: any) {
    return JSON.stringify(jsonObject);
  }

  isInternalUrl(url: string): boolean {
    let domainNameStartIndex = url.indexOf("://");
    let domainName = "";

    if (domainNameStartIndex >= 0)
      domainName = url.substring(domainNameStartIndex + 3);
    else domainName = url;

    let domainNameEndIndex = domainName.indexOf("/");

    if (domainNameEndIndex >= 0)
      domainName = domainName.substring(0, domainNameEndIndex);

    return (domainName === '') ? true : false;
  }

  /* DEFAULT MESSAGE */
  showDefaultError() {
    this.msg.error(message.ERROR.DEFAULT);
  }
  showDefaultSuccess() {
    this.msg.error(message.SUCCESS.INSERT);
  }
  showError(errMsg) {
    this.msg.error(errMsg);
  }
  showInfo(infoMsg) {
    this.msg.info(infoMsg);
  }
  showSuccess(successMsg) {
    this.msg.success(successMsg);
  }
  showWarning(warningMsg) {
    this.msg.warning(warningMsg);
  }

  /* Confirm */
  showConfirm(
    confirmMsg,
    callback: (evt) => void,
    okText: string = "ตกลง",
    cancelText: string = "ยกเลิก"
  ) {
    this.modalService.confirm({
      nzTitle: confirmMsg,
      nzContent: null,
      nzOnOk: () => callback(true),
      nzOnCancel: () => callback(false),
      nzOkText: okText,
      nzCancelText: cancelText
    });
  }
  /** Helper **/
  randomStr(maxCharacter: number = 10): string {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
