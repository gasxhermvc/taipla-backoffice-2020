import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '@based/services/app.service';
import { DetectService } from '@based/services/detect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public app: AppService
    , private detect: DetectService
    , private renderer: Renderer2) {
    (window as any).app = this;
  }

  ngOnInit() {
    // console.log('ok');
    this.onResize(null);
    this.init();
  }

  init() {
    this.app.setInitPagination();
    this.app.showLoading();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let devices = '';
    let evt = event?.target || window;
    const innerWidth = (evt).innerWidth;

    if (innerWidth > 0 && innerWidth < 520) {
      devices = 'MOBILE';
    } else if (innerWidth > 520 && innerWidth <= 980) {
      devices = 'TABLET';
    } else if (innerWidth > 980 && innerWidth <= 1320) {
      devices = 'TABLET';
    } else if (innerWidth > 1320 && innerWidth <= 1468) {
      devices = 'LABTOP';
    } else {
      devices = '';
    }

    this.detect.device = devices;

    const body = document.querySelector("body");

    if (body) {
      let classNames = (this.detect.responsiveClass || '').split(' ');

      classNames = classNames.filter((item: any) => item);

      if (classNames && classNames.length < 1) {
        classNames = ['is-responsive', 'mobile', 'tablet', 'labtop'];
        classNames && classNames.length > 0 && classNames.forEach((className: any) => {
          if (className === undefined || className === null || className === '') { return; }
          this.renderer.removeClass(body, className);
        });
        return;
      }

      classNames && classNames.length > 0 && classNames.forEach((className: any) => {
        if (className === undefined || className === null || className === '') { return; }
        this.renderer.removeClass(body, className);
        this.renderer.addClass(body, className);
      });
    }
  }

}
