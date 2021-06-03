import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { PromotionService } from '@backoffice/services/promotion.service';
import { MODE } from '@app-base/enums/MODE';
import { BaseClass } from '@based/classes/base-class';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent extends BaseClass implements OnInit {

  _isParent: boolean = false;
  @Input()
  set isParent(parent: boolean) {
    this._isParent = parent;
    this.backoffice.currentSystem = this.currentSystem;
  }

  get isParent() {
    return this._isParent;
  }

  public MODE = MODE;
  currentSystem: string = (this.isParent ? 'restaurant' : 'promotion');

  get service(): PromotionService {
    return this.store[this.currentSystem] || {};
  }

  @Output() selected = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).promotion = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
