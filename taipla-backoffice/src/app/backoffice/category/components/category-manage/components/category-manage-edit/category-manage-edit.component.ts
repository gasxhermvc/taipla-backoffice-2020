import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CategoryService } from '@backoffice/services/category.service';

@Component({
  selector: 'app-category-manage-edit',
  templateUrl: './category-manage-edit.component.html',
  styleUrls: ['./category-manage-edit.component.scss']
})
export class CategoryManageEditComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CategoryService {
    return this.store['category'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cme = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initConfig();
      this.retrieveData();
    }, 0);
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'category_id',
        invisible: true
      },
      {
        key: 'name',
        label: 'ประเภทอาหาร',
        type: ControlType.text,
        errorMessages: {
          required: 'กรุณาป้อนประเภทอาหาร',
          minLength: 'กรุณาป้อนอย่างน้อย 3 ตัวอักษร',
          maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร'
        },
        min: 3,
        max: 150
      }
    ]
  }

  private async retrieveData() {
    this.showLoading();
    const result = await this.service.getCategory({});

    if (result) {
      this.service.CATEGORY_INFO.DATA = { ...result };
      if (this.form) {
        this.form.setFormData(this.service.CATEGORY_INFO.DATA);
      }
    } else {
      this.onBack();
      this.app.showError(this.app.message.ERROR.NOT_FOUND_DATA);
    }

    this.hideLoading();
  }

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      const data = this.form.getFormData();
      const result = await this.service.editCategory(data);
      if (result) {
        this.app.showSuccess(this.app.message.SUCCESS.UPDATE);
        this.onBack();
        this.complete.emit();
      } else {
        this.app.showError(this.app.message.ERROR.UPDATE);
      }
    } else {
      this.app.showError(this.app.message.ERROR.INVALID);
    }

    this.hideLoading();
  }

  onClear() {
    if (this.form) {
      this.form.initFormGroup();
      if (this.service.CATEGORY_INFO.DATA) {
        this.form.setFormData(this.service.CATEGORY_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }

}
