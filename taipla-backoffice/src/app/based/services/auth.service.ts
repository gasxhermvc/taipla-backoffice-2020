import { Injectable } from '@angular/core';
import { AppService } from '@based/services/app.service';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private app: AppService) { }

  isLoggedIn(): Observable<boolean> {
    return of(true);
  }

  login(credential: any): Observable<any> {
    this.app.showLoading();
    // return this.app.reqUrl(`${this.app.hostName}/Handlers/AppLogin.ashx`, credential).pipe(
    //   map(response => {
    //     if (response.success) {
    //       this.appService.user = response.data[0];
    //     }
    //     this.appService.hideLoading();
    //     return response;
    //   })
    // );
    return of(true);
  }

  logout(): Observable<any> {
    this.app.showLoading();
    // return this.appService.reqUrl(`${this.appService.hostName}/Handlers/AppLogout.ashx`, null).pipe(
    //   map(response => {
    //     if (response.success) {
    //       this.appService.user = null;
    //       this.appService.appConfig = null;
    //     } else {
    //       if (response.message === 'NOT_AUTHORIZED') {
    //         window.location.reload();
    //       }
    //     }
    //     this.appService.hideLoading();

    //     return response;
    //   })
    // );
    return of(true);
  }
}
