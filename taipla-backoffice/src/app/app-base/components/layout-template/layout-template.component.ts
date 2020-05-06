//=>Angular
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

//=>App
import { environment as env } from '@environments/environment';
import { LayoutTemplateService } from '@app/app-base/components/layout-template/layout-template.service';
import { MENU } from '@app/app-base/interfaces/menu-config';

@Component({
  selector: 'app-layout-template',
  templateUrl: './layout-template.component.html',
  styleUrls: ['./layout-template.component.scss']
})
export class LayoutTemplateComponent implements OnInit {

  env: any = env;

  @Input('menu')
  set menu(menus: any) {
    if (menus && menus != null) {
      this.layout.setMenu(menus);
    }
  }

  get menus(): MENU[] {
    return this.layout.getMenu();
  }

  _current: any;
  get current() {
    return this._current || undefined;
  }

  @Input()
  set current(current: any) {
    if (current !== undefined && current !== null) {
      setTimeout(() => {
        this._current = current;
        this.layout.setActiveMenu(current);
      }, 0);
    }
  }

  _profile: any;
  get profile() {
    return this._profile || undefined;
  }

  @Input()
  set profile(profile: any) {
    if (profile !== undefined && profile !== null) {
      setTimeout(() => {
        this._profile = profile;
      }, 0);
    }
  }
  get isShowMenu() {
    return this.menus !== undefined && this.current !== undefined;
  }

  constructor(public layout: LayoutTemplateService,
    private router: Router) {
    (window as any).layout = this;
  }

  ngOnInit() { }

  onClickMenu(index: number) {
    const menu = this.menus[index] || null;

    if (menu) {
      this.layout.setActiveMenu(menu.NAME);
      this.layout.pageChange.emit(true);

      const PATH = `${(this.env.auth.redirects.intent._startTrim('/') + '/' + menu.PATH)}`;
      this.router.navigate([`${PATH}`]).then(() => {
        this.layout.pageChange.emit(false);
      });
    }
  }
}
