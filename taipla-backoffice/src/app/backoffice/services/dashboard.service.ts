import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  loaded: boolean;

  @Output() isLoaded = new EventEmitter<any>();

  constructor() {
    console.log('create dashboard service');
    this.init();
  }

  private init() {
    setTimeout(() => {
      this.isLoaded.emit(true);
    }, 2000)
  }
}
