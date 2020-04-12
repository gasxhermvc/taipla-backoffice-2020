import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { TableConfig, ColumnConfig } from '@based/interfaces/TableConfig';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input('tableConfig') tableConfig: TableConfig = {
    displayOrder: true,
    displayAction: true
  };

  _columns: ColumnConfig[] = [];
  @Input('columns')
  set columns(value: ColumnConfig[]) {
    if (value) {
      setTimeout(() => {
        this._columns = value;
      }, 0);
    }
  }

  get columns() {
    if (this.tableConfig && !this.tableConfig.displayAction) {
      return [].concat(this._columns).filter(f => !f.action);
    }

    return this._columns || [];
  }

  _items: any[] = [];
  @Input('items')
  set items(value: any[]) {
    if (value) {
      setTimeout(() => {
        this._items = value;
      }, 0);
    }
  }

  @Input() template: TemplateRef<any>;

  @Input() action: TemplateRef<any>;

  @Output() scrolled = new EventEmitter();

  @Output() selected = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onScrolled() {
    this.scrolled.emit();
  }

  onSelected(item) {
    this.selected.emit(item);
  }

  onEditItem(item, index) {
    this.edit.emit({ item: item, index: index });
  }

  onDeleteItem(item, index) {
    this.edit.emit({ item: item, index: index });
  }
}