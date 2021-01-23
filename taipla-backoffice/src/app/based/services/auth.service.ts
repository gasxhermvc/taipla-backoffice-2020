//=>Angular
import { Injectable } from '@angular/core';

//=>Libraries
import { of, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

//=App
import { AppService } from '@based/services/app.service';
import { LocalStorageService } from '@based/services/local-storage.service';
import { User, JsonWebToken } from '@app-base/interfaces/default-interface';
import { MOCK_USER } from '@based/mocks/defaults/mock-user';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  public redirectUrl: string;

  constructor(private app: AppService, private localStorage: LocalStorageService) { }

  isLoggedIn(): Observable<boolean> {
    this.app.showLoading();
    if (this.app.user !== undefined) {
      return of(true);
    } else {
      const jwt = this.localStorage.exsit('jwt') ? this.localStorage.get('jwt') : undefined;
      this.app.jwt = jwt;

      if (!jwt) {
        return of(false);
      }

      return this.getUserInfo();
    }
  }

  login(credential: any): Observable<any> {
    return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.AUTH.LOGIN}`, {
      method: 'POST',
      parameters: credential
    }).pipe(
      map((response: any) => {
        if (response && response.success) {
          let JWT: JsonWebToken;

          JWT = {
            access_token: response.data.token,
            expired: response.data.expired,
            remember_me: (credential && credential.remember_me) ? credential.remember_me : false,
            authenticated: response.success
          }

          this.app.jwt = JWT;
          this.localStorage.set('jwt', JWT);
        }
        return response;
      })
    )
  }

  logout(): Observable<any> {
    const jwt = this.localStorage.exsit('jwt') ? this.localStorage.get('jwt') : undefined;

    if (!jwt) {
      return of(false);
    }

    this.app.jwt.authenticated = false;

    return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.AUTH.LOGOUT}`, {
      method: 'POST',
      headers: { ...this.app.header }
    }).pipe(
      map((response: any) => {
        if (response && response.success) {
          this.app.jwt = undefined;
          this.localStorage.remove('jwt');
          this.app.showSuccess(this.app.message.SUCCESS.LOGOUT);
        } else {
          window.location.reload();
        }
        return response;
      }));
  }

  getUserInfo(): Observable<any> {
    return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.AUTH.USER_INFO}`, {
      method: 'GET',
      headers: { ...this.app.header }
    }).pipe(map((response: any) => {

      if (response && response.success) {
        this.app.jwt.payload = response.data;
      }

      return response.success;
    }));
  }
}
