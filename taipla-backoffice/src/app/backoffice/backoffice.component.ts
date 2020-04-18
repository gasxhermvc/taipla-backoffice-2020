//=>Angular
import { Component, OnInit, Injector, Output } from '@angular/core';

//=>App
import { MENU_CONFIGS } from '@app/app-base/config/menu';
import { MENU } from '@app/app-base/interfaces/menu-config';
import { BaseClass } from '@app/based/classes/base-class';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';

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

  constructor(injector: Injector, private router: Router) {
    super(injector);
    (window as any).backoffice = this;
  }

  ngOnInit() {
    console.log('backoffice.component');
    this.menus = MENU_CONFIGS;
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
        this.app.hideLoading();
      }
    });
  }

  private pageChanged() {
    this.pageChangeSub = this.layout.pageChange.subscribe((changed) => {
      console.log('page changed subscribe', changed);
      if (changed) {
        this.showLoading();
      } else {
        this.hideLoading();
      }
    });
  }
}
