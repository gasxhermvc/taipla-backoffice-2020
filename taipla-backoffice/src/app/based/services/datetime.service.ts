import { Injectable } from '@angular/core';
import * as moment from 'moment';
import "moment/locale/th";

@Injectable()
export class DatetimeService {

  private _moment;

  constructor() {
    (window as any)._momentService = this;
    this._moment = moment;
    this._moment = this._moment();
  }

  //=>for new instance of DatetimeService
  public created() {
    let dts = new DatetimeService();
    return dts;
  }

  //=>get instance moment for use moment method
  public instance() {
    return this._moment;
  }

  //=>get moment function
  public moment(locale: string = 'th') {
    moment.locale(locale);
    return moment;
  }

  //=>set a locale of moment
  public locale(locale: string = ''): string {
    if (!locale || locale === '') {
      return this._moment.locale();
    }

    this._moment.locale(locale);
    return this._moment.locale();
  }

  public displayTH(dateTime: string, formatter: string = '') {
    let date = new Date(dateTime);

    const dateStr = `${date.toLocaleDateString('th', { day: 'numeric', month: 'numeric', year: 'numeric' })} ${date.toTimeString()}`;

    return this.display(dateStr, this.formatter('th'), formatter);
  }

  public displayEN(dateTime: string, formatter: string = '') {
    return this.display(dateTime, '', formatter);
  }

  //=>convert timestamp to moment js
  public toMoment(timestamp: number) {
    let _moment: any = this.moment();

    const date: any = new Date(timestamp);
    const formatter: any = this.formatter(this.locale());
    const dt = _moment(date, formatter);
    dt.locale(this.locale());
    return dt;
  }

  //=>convert moment to timestamp
  public toTimeStamp(moment: any) {
    return moment._d.getTime();
  }

  public convertDate(dateTime: string, formatter: string = '') {
    //let _dt = this.created();
    let _moment: any = this.moment();

    formatter = this.replaceFormatter(formatter);

    const dt = _moment(dateTime, formatter);

    return dt._d;
  }

  private display(dateTime: string, momentFormatter: string, formatter: string) {
    let _moment: any = moment;

    if (momentFormatter === '') {
      _moment = _moment(dateTime);
      _moment.locale(this._moment.locale());

      return _moment.format(formatter);
    }

    _moment = _moment(dateTime, momentFormatter);
    _moment.locale(this._moment.locale());

    return _moment.format(formatter);
  }

  private formatter(locale: string) {
    switch (locale) {
      case 'th': {
        return 'DD/MM/YYYY HH:mm:ss.SSS';
      }
      case 'en': {
        return 'YYYY-MM-DD HH:mm:ss.SSS';
      }
      default: {
        return 'DD/MM/YYYY HH:mm:ss.SSS';
      }
    }
  }
  private replaceFormatter(fotmatter: string) {
    return fotmatter.replace('dd', 'DD').replace('yyyy', 'YYYY');
  }
}
