import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CultureService } from '@backoffice/services/culture.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss'],
  host: {
    class: 'main'
  }
})
export class CultureComponent extends BaseClass implements OnInit {

  public MODE = MODE;
  currentSystem: string = 'culture';

  get service(): CultureService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).culture = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
