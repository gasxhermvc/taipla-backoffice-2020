import { Component, OnInit } from '@angular/core';
import { AppService } from '@based/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public app: AppService) {
    (window as any).app = this;
  }
}
