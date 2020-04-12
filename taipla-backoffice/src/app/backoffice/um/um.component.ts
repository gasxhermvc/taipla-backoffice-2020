import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { UmService } from '../services/um.service';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.scss']
})
export class UmComponent extends BaseClass implements OnInit {

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
    console.log('um');
  }

}
