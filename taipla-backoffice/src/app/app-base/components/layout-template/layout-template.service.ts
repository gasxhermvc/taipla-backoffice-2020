import { Injectable, Output, EventEmitter } from '@angular/core';
import { MENU } from '@app/app-base/interfaces/menu-config';

@Injectable({
  providedIn: 'root'
})
export class LayoutTemplateService {

  private menus: MENU[];
  @Output() public pageChange = new EventEmitter<any>();

  isCollapsed: boolean = false;

  constructor() {
  }

  setMenu(menus: any) {
    setTimeout(() => {
      this.menus = menus;
    }, 0);
  }

  getMenu(): MENU[] {
    return this.menus || [];
  }

  setActiveMenu(current: any = 'dashboard') {
    if (this.menus && this.menus.length > 0) {
      const menus = [].concat(...this.menus || [])
        .map((menu: MENU) => {
          menu.IS_ACTIVE = false;
          return menu;
        });

      const index = menus.findIndex((menu: MENU) => menu.NAME === current);

      if (menus[index] !== undefined) {
        menus[index].IS_ACTIVE = true;
      }

      this.setMenu(menus);
    }
  }

}
