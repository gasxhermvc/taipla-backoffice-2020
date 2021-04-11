import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-display-datetime',
  templateUrl: './display-datetime.component.html',
  styleUrls: ['./display-datetime.component.scss']
})
export class DisplayDatetimeComponent implements OnInit {

  private moment: any = moment;
  @Input() datetime: any;
  @Input() format: any;

  constructor(private datePipe: DatePipe) {
    moment.locale('th');
  }

  ngOnInit(): void {
  }

  display(): string {
    if (this.datetime === '' || this.datetime === undefined) {
      return '-';
    }
    const dt = this.moment(this.datetime).add(543, 'years');
    return dt.format(this.format);
  }

}
