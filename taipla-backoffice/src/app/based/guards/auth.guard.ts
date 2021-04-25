import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';
import { BackofficeService } from '@app/backoffice/services/backoffice.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  isLoggedOut: boolean = false;

  constructor(private app: AppService, private auth: AuthService, private backoffice: BackofficeService, private router: Router) {
    (window as any).auth_guard = this;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url).pipe(
      map((response: any) => {
        if (!this.isLoggedOut) { //=>ทำงานเมื่อไม่ใช่การล็อกเอ้าท์
          this.app.hideLoading();
        }

        return response;
      }));
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  private checkLogin(url: string): Observable<boolean> {
    this.app.showLoading();

    return this.auth.isLoggedIn().pipe(
      map((loggedIn: boolean) => {
        this.app.showLoading();
        console.log("checkLogin-> ", url, loggedIn);

        if (url.includes(this.app.env.auth.redirects.logout)) {
          this.isLoggedOut = true;
          this.auth.logout().subscribe(() => {
            //=>ล็อกเอ้าท์
            loggedIn = false;
            this.redirect(url, this.isLoggedOut);
          });
        } else {
          if (!loggedIn) {
            //=>ไม่ล็อกอิน
            this.redirect(url, !this.isLoggedOut);
          }
        }
        return loggedIn;
      })
    );
  }

  redirect(url: any = '', isRedirect: boolean = false) {
    if (isRedirect) {
      // Store the attempted URL for redirecting
      this.auth.redirectUrl = url.includes(this.app.env.auth.redirects.logout) ? '' : url;
      // Navigate to the login page with extras
      this.router.navigate([this.app.env.auth.redirects.login]).then(() => {
        this.app.hideLoading();
        this.isLoggedOut = false;
      });
    }
  }

  getParam(name) {
    const results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    if (!results) {
      return 0;
    }
    return results[1] || 0;
  }

}
