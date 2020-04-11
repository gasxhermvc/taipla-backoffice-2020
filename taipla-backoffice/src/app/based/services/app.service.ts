import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '@environments/environment';

//=>Libraries
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

//=>App
import message from "@assets/messages/message.json";
import { XHttpOptions } from '@based/interfaces/HttpOptions';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loading: boolean = false;

  get hostName(): string {
    return document.getElementsByTagName("base")[0].href;
  }

  constructor(private http: HttpClient,
    private msg: NzMessageService,
    private modalService: NzModalService) { }

  reqUrl(url: string, httpOptions: XHttpOptions, alert: boolean = true) {
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
        this.showDefaultError();
      }
    }));
  }

  /* Loading */
  showLoading() {
    setTimeout(() => {
      this.loading = true;
    }, 0);
  }

  hideLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  /* Private */
  private _reqInternalUrl(url: string, options: XHttpOptions): Observable<any> {
    const domainName = env.api.baseUrl;
    const combineUrl = domainName + "/" + (url.startsWith('/') ? url.substring(1).trim() : url.trim());

    if (options && options.headers == undefined) {
      options.headers = {
        "Content-Type": "application/json; charset=utf8"
      }
    }

    return this._reqUrl(combineUrl, options);
  }

  private _reqExternalUrl(url: string, options: XHttpOptions): Observable<any> {

    if (options && options.headers == undefined) {
      options.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf8"
      }
    }

    return this._reqUrl(url, options);
  }

  private _reqUrl(url: string, options: XHttpOptions): Observable<any> {
    let req;

    const headers = new HttpHeaders();

    if (options && options.headers) {
      Object.keys(options.headers).forEach(key => {
        headers.append(key, options.headers[key]);
      });
    }

    const params = options && options.parameters ? { params: options.parameters } : {};

    switch (options.method) {
      case "get":
        req = this.http.get(url, {
          headers: headers,
          ...params
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
          ...params
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

  /* Support */
  toJsonObject(jsonString: string) {
    return JSON.parse(jsonString);
  }

  toJsonString(jsonObject: any) {
    return JSON.stringify(jsonObject);
  }

  isInternalUrl(url: string): string {
    let domainNameStartIndex = url.indexOf("://");
    let domainName = "";

    if (domainNameStartIndex >= 0)
      domainName = url.substring(domainNameStartIndex + 3);
    else domainName = url;

    let domainNameEndIndex = domainName.indexOf("/");

    if (domainNameEndIndex >= 0)
      domainName = domainName.substring(0, domainNameEndIndex);

    return domainName;
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
}
