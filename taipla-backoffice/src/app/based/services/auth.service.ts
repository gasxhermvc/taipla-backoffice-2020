import { Injectable } from '@angular/core';
import { AppService } from '@based/services/app.service';
import { of, Observable } from 'rxjs';
import { User } from '@app-base/interfaces/default-interface';
import { MOCK_USER } from '@based/mocks/defaults/mock-user';
import { LocalStorageService } from '@based/services/local-storage.service';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private app: AppService, private localStorage: LocalStorageService) { }

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
    if (!this.localStorage.exsit('auth')) {
      const user: User = { ...MOCK_USER };
      this.localStorage.set('auth', user);
    }

    setTimeout(() => {
      this.app.showSuccess(this.app.message.SUCCESS.LOGIN);
      this.app.hideLoading();
    }, 1000);
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
    this.localStorage.remove('auth');

    setTimeout(() => {
      this.app.showSuccess(this.app.message.SUCCESS.LOGOUT);
      this.app.hideLoading();
    }, 1000);

    //     return response;
    //   })
    // );
    return of(true);
  }
}
