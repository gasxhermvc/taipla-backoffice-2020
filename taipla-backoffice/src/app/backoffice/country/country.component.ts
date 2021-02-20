import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { CountryService } from '@backoffice/services/country.service';
import { MODE } from '@app-base/enums/MODE';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  host: {
    class: 'main'
  }
})
export class CountryComponent extends BaseClass implements OnInit {

  public MODE = MODE;

  currentSystem: string = 'country';

  get service(): CountryService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).country = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
