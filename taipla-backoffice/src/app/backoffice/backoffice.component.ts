//=>Angular
import { Component, OnInit, Injector, Output } from '@angular/core';

//=>App
import { MENU_CONFIGS } from '@app/app-base/config/menu';
import { MENU } from '@app/app-base/interfaces/menu-config';
import { BaseClass } from '@app/based/classes/base-class';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent extends BaseClass implements OnInit {
  private _loaded: boolean = false;
  public menus: MENU[];

  get loaded() {
    return this._loaded;
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).backoffice = this;
  }

  ngOnInit() {
    this.app.showLoading();
    this.init();
  }

  ngOnDestroy() {
    this.backoffice.isLoaded.unsubscribe();
    this.layout.pageChange.unsubscribe();
  }

  private init() {
    this.onLoad();
    this.pageChanged();
    this.menus = MENU_CONFIGS;
  }

  private onLoad() {
    this.backoffice.isLoaded.subscribe((loaded: any) => {
      this._loaded = loaded;
      this.app.hideLoading();
    });
  }

  private pageChanged() {
    this.layout.pageChange.subscribe((changed) => {
      console.log('page changed subscribe', changed);
      if (changed) {
        this.showLoading();
      } else {
        this.hideLoading();
      }
    });
  }
}
