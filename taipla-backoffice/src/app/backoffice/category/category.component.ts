import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CategoryService } from '@backoffice/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends BaseClass implements OnInit {

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
    console.log('category');
  }

  ngOnDestroy() {

  }
}
