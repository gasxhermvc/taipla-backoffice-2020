import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { AccountService } from '@backoffice/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseClass implements OnInit {

  currentSystem: string = 'account';

  get service(): AccountService {
    return this.store.service[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).account = this;
  }

  ngOnInit() {
    console.log('account');
  }

}
