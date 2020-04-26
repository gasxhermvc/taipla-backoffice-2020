import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { UmService } from '@backoffice/services/um.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.scss'],
  host: {
    class: 'main'
  }
})
export class UmComponent extends BaseClass implements OnInit {

  public MODE = MODE;

  currentSystem: string = 'um';

  get service(): UmService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).um = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
