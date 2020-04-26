import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CategoryService } from '@backoffice/services/category.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  host: {
    class: 'main'
  }
})
export class CategoryComponent extends BaseClass implements OnInit {

  public MODE = MODE;
  currentSystem: string = 'category';

  get service(): CategoryService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).category = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
