import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private root: string = environment.localStorage.root;
  private localStorage: any;

  constructor() {
    (window as any).local = this;
    this.localStorage = this.getInstance();
  }

  exsit(key: string): boolean {
    return this.localStorage[key] !== undefined;
  }

  get(key: string) {
    return this.localStorage[key];
  }

  set(key: string, value: any) {
    this.localStorage[key] = value;
    this.setItem(this.root, this.localStorage);
  }

  remove(key: string) {
    if (this.localStorage[key] !== undefined) {
      delete this.localStorage[key];
      this.setItem(this.root, this.localStorage);
    }
  }

  clear() {
    this.clearAll();
    this.localStorage = this.getInstance();
  }

  private getInstance() {
    let data;
    if (window.localStorage !== undefined) {
      if (window.localStorage[this.root] !== undefined) { //=>already
        data = this.getItem(this.root);
      } else {
        this.create();
        data = this.getItem(this.root);
      }
    }
    return { ...data };
  }

  private getItem(key: string): any {
    let item;
    try {
      item = JSON.parse(window.localStorage.getItem(key));
    } catch{
      this.clearAll();
      item = JSON.parse(window.localStorage.getItem(key));
    }

    return { ...item };
  }

  private create() {
    this.setItem(this.root, {});
  }

  private setItem(key: string, value: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch{
      this.clearAll();
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private clearAll(): void {
    window.localStorage.clear();
    this.create();
    this.localStorage = this.getInstance();
  }
}
