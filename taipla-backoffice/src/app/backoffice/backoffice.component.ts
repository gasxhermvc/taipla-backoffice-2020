//=>Angular
import { Component, OnInit, Injector, Output } from '@angular/core';

//=>App
import { MENU } from '@app/app-base/interfaces/menu-config';
import { BaseClass } from '@app/based/classes/base-class';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '@app/app-base/interfaces/default-interface';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent extends BaseClass implements OnInit {
  private isLoadedSub: any;
  private pageChangeSub: any;

  private _loaded: boolean = false;
  public menus: MENU[];

  get loaded() {
    return this._loaded;
  }

  get currentSystem() {
    return this.backoffice.currentSystem;
  }

  get user(): User {
    return this.app.user || undefined;
  }

  constructor(injector: Injector, private router: Router) {
    super(injector);
    (window as any).backoffice = this;
  }

  ngOnInit() {
    console.log('backoffice.component');
    this.menus = this.backoffice.menus;
    this.init();
  }

  ngAfterViewInit() {
    console.log('after.backoffice.component');
    this.router.events.subscribe((route: any) => {
      if (route instanceof NavigationEnd) {
        this.hideLoading();
      }
    });
  }

  ngOnDestroy() {
    if (this.isLoadedSub !== undefined) {
      this.isLoadedSub.unsubscribe();
      this.isLoadedSub = undefined;
    }
    if (this.pageChangeSub !== undefined) {
      this.pageChangeSub.unsubscribe();
      this.pageChangeSub = undefined;
    }

    this.backoffice.lookup = undefined;
  }

  private init() {
    this.onLoad();
    this.pageChanged();
  }

  private onLoad() {
    this.isLoadedSub = this.backoffice.isLoaded.subscribe((loaded: any) => {
      console.log('backoffice.isLoaded', loaded)
      if (loaded) {
        this._loaded = loaded;
      }
    });
  }

  private pageChanged() {
    this.pageChangeSub = this.layout.pageChange.subscribe((changed) => {
      console.log('page changed subscribe', changed);
      this.app.setInitPagination();
      if (changed) {
        this.showLoading();
      } else {
        this.hideLoading();
      }
    });
  }
}
