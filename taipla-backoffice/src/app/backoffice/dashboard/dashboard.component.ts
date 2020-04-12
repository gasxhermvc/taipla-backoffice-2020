//=>Angular
import { Component, OnInit, Injector } from '@angular/core';

//=>App
import { BaseClass } from '@app/based/classes/base-class';
import { DashboardService } from '@backoffice/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseClass implements OnInit {

  currentSystem: string = 'dashboard';

  get service(): DashboardService {
    return this.store.service[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).dashboard = this;
  }

  ngOnInit() {
    console.log('dashboard');
  }
}
