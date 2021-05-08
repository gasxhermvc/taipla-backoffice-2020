//=>Angular
import { Injectable } from '@angular/core';

//=>Libraries
import { of, Observable, Subject, forkJoin } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

//=App
import { AppService } from '@based/services/app.service';
import { LocalStorageService } from '@based/services/local-storage.service';
import { JsonWebToken } from '@app-base/interfaces/default-interface';
import { LoginForm } from '@app/app-base/interfaces/login-interface';
import { BackofficeService } from '@app/backoffice/services/backoffice.service';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  public redirectUrl: string;

  constructor(private app: AppService, private backoffice: BackofficeService, private localStorage: LocalStorageService) { }

  isLoggedIn(): Observable<boolean> {
    this.app.showLoading();
    if (this.app.user !== undefined) {
      // this.backoffice.init2().subscribe((test) => {
      //   console.log('test', test);
      //   return of(true);
      // });
      return of(true);
    } else {
      const jwt = this.localStorage.exsit('jwt') ? this.localStorage.get('jwt') : undefined;
      this.app.jwt = jwt;

      if (!jwt) {
        return of(false);
      }

      const subject = new Subject<boolean>();

      forkJoin([this.getUserInfo(), this.backoffice.init2()]).subscribe((response) => {
        subject.next(response[0]);
      });

      return subject.asObservable();
    }
  }

  login(credential: LoginForm): Observable<any> {
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
            remember_me: (credential && credential.REMEMBER_ME) ? credential.REMEMBER_ME : false,
            client_id: response.data.client_id,
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

    return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.AUTH.LOGOUT}/${jwt.client_id}`, {
      method: 'POST',
      headers: { ...this.app.header }
    }).pipe(
      map((response: any) => {
        if (response && response.success) {
          this.app.jwt = undefined;
          this.localStorage.remove('jwt');
          this.backoffice.menus = undefined;
          this.app.showSuccess(this.app.message.SUCCESS.LOGOUT);
          window.location.reload();
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

      if (response) {
        switch (response.statusCode) {
          case 200:
            this.app.jwt.payload = response.data;
            break;
          default:
            this.app.showError(response.message || this.app.message.ERROR.DEFAULT);
            return response.success;
        }
      }
      return response.success;

    }), catchError((handle: any) => {
      if (handle.error && !handle.error.success) {

        this.app.showError(handle.error.message || this.app.message.ERROR.DEFAULT);
      }

      return this.logout().pipe(map((response: any) => {
        if (response instanceof Boolean) {
          return response;
        }

        return response.success;
      }));
    }));
  }
}
