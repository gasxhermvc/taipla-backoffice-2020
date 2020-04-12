import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  _items: any[] = [];
  @Input('items')
  set items(value: any[]) {
    if (value) {
      this._items = value;
    }
  }

  @Input() template: TemplateRef<any>;

  @Output() scrolled = new EventEmitter();

  @Output() selected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onScrolled() {
    this.scrolled.emit();
  }

  onSelected(item) {
    this.selected.emit(item);
  }
}
