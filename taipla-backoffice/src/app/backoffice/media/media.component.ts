import { Component, OnInit, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { MediaService } from '@backoffice/services/media.service';
import { MODE } from '@app/app-base/enums/MODE';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  host: {
    class: 'main'
  }
})
export class MediaComponent extends BaseClass implements OnInit {

  public MODE = MODE;
  currentSystem: string = 'media';

  get service(): MediaService {
    return this.store[this.currentSystem] || {};
  }

  constructor(injector: Injector) {
    super(injector);
    this.backoffice.currentSystem = this.currentSystem;
    (window as any).media = this;
  }

  ngOnInit() {
    this.service.STATE = this.service.STATE_PAGE.LISTS;
  }
}
