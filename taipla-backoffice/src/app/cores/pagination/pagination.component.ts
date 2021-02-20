import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _pageSize: any;
  @Input() items: any[];
  @Input() pageIndex: any = 1;
  @Input() template: TemplateRef<any>;

  @Output() pageIndexChange: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<any> = new EventEmitter();

  @Input()
  set pageSize(pageSize: any) {
    if (pageSize != undefined && pageSize != null && typeof (pageSize) === 'number') {
      this._pageSize = pageSize;
    }
  }

  get pageSize() {
    return this._pageSize || 10;
  }

  get from(): any {
    return this.pageIndex === 1 ? 0 : ((this.pageSize * this.pageIndex) - this.pageSize);
  }

  get to(): any {
    return this.pageIndex === 1 ? this.pageSize : (this.pageSize * this.pageIndex);
  }

  get total() {
    return this.items.length || 0;
  }

  get lists(): any[] {
    return this.pageIndex === 1 ? this.items.slice(this.from, this.to) :
      this.items.slice(this.from, this.to);
  }

  constructor() { window["pagination"] = this; }

  ngOnInit(): void {
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = pageSize;
    this.pageSizeChange.emit(pageSize);
  }

  onPageIndexChange(pageIndex: any) {
    this.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
  }
}
