import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private app: AppService, private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  private checkLogin(url: string): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      map(loggedIn => {
        console.log("checkLogin-> ", url);

        if (url.startsWith(this.app.env.auth.redirects.logout)) {
          this.auth.logout();
          loggedIn = false;
        }

        if (!loggedIn) {
          // Store the attempted URL for redirecting
          this.auth.redirectUrl = url;
          // Navigate to the login page with extras
          this.router.navigate([this.app.env.auth.redirects.login]);
        }

        return loggedIn;
      })
    );
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
