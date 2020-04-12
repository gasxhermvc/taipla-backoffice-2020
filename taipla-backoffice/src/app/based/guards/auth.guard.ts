import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@based/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

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
    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        console.log("checkLogin-> ", url);
        if (!loggedIn) {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;

          // Navigate to the login page with extras
          this.router.navigate(['/login']);
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
