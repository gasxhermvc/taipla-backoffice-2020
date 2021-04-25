import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectService {

  constructor() { }

  device: any;
  hideMenu: boolean = false;

  get isResponsive() {
    switch (this.device) {
      case "MOBILE":
      case "IPAD":
      case "TABLET":
      case "LABTOP":
        return true;
    }
    return false;
  }

  get responsiveClass() {
    switch (this.device) {
      case "MOBILE":
        return "is-responsive mobile";
      case "TABLET":
        return "is-responsive mobile tablet";
      case "LABTOP":
        return "is-responsive mobile tablet labtop";
      default:
        return '';
    }
  }

  get isMobile() {
    switch (this.device) {
      case "MOBILE":
        return true;
      default:
        return false;
    }
  }

  get isTablet() {
    switch (this.device) {
      case "TABLET":
        return true;
      default:
        return false;
    }
  }


  get isLabtop() {
    switch (this.device) {
      case "LABTOP":
        return true;
      default:
        return false;
    }
  }

  has(displayed: string) {
    if (displayed === undefined || displayed === '') return undefined;
    let matches = [];
    let displays = displayed.split(' ');

    displays.forEach((item: any) => {
      if (item.trim() == (this.device && this.device.toLowerCase())) {
        matches.push(item);
      }
    })

    return matches && matches.length > 0;
  }

}
