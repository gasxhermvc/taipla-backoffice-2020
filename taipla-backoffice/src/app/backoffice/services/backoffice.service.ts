import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {

  loading: boolean = false;

  constructor() { }
}
