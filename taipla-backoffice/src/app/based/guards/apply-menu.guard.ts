import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MENU_CONFIGS } from '@app/app-base/config/menu';
import { BackofficeService } from '@app/backoffice/services/backoffice.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '@based/services/app.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplyMenuGuard implements CanActivate {
  private environment: any = environment;

  constructor(private app: AppService, private backoffice: BackofficeService, private router: Router) { (window as any).menu = this; }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadMenus(state.url).pipe(map((response: any) => {
      let menu: any = this.backoffice.menus.find((item: any) => item.IS_ACTIVE);
      let currentPath: any = this.backoffice.menus.find((item: any) => state.url.includes(item.PATH));

      if (menu && !state.url.includes(menu.PATH)) {
        if (!currentPath) {
          this.router.navigate([menu.PATH]).then(() => {
            return response;
          });
        }
      }

      return response;
    }));
  }

  private loadMenus(url: string): Observable<boolean> {
    this.app.showLoading();

    if (this.backoffice.menus) {
      this.app.hideLoading();
      return of(true);
    }

    return this.app.reqUrl(`${this.app.apiUrl}/${this.app.apiVersion}/backend/${this.app.route.MENU.LISTS}`, {
      method: 'GET',
      headers: this.app.header
    }).pipe(
      map((response: any) => {
        this.app.hideLoading();
        if (response && response.success) {
          this.backoffice.menus = response.data;
          if (this.backoffice.menus && this.backoffice.menus.length < 1) {
            this.backoffice.menus = MENU_CONFIGS;
          }

          this.backoffice.menus = [].concat(...this.backoffice.menus).map((item: any) => {
            let path = item.PATH.startsWith('environment') ? eval(`this.${item.PATH}`) : undefined;

            if (path) {
              item.PATH = path;
            }

            return item;
          });
        }

        return true;
      })
    )
  }
}
