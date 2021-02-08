import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CultureService } from '@backoffice/services/culture.service';

@Component({
  selector: 'app-culture-manage-edit',
  templateUrl: './culture-manage-edit.component.html',
  styleUrls: ['./culture-manage-edit.component.scss']
})
export class CultureManageEditComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CultureService {
    return this.store['culture'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cme = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.service.CULTURE_INFO) {
      setTimeout(() => {
        this.initConfig();
        this.retrieveData();
      }, 0);
    }
  }

  initConfig() {
    this.formConfig = [
      {
        key: 'culture_id',
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
    const param: any = {};
    const result = await this.service.getCulture(param);

    if (result) {
      this.service.CULTURE_INFO.DATA = { ...result };
      if (this.form) {
        this.form.setFormData(this.service.CULTURE_INFO.DATA);
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
      let param: any = [];
      const data = this.form.getFormData();
      param.push(data);
      const result = await this.service.editCulture(param);
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
      if (this.service.CULTURE_INFO.DATA) {
        this.form.setFormData(this.service.CULTURE_INFO.DATA);
      }
    }
  }

  onBack() {
    this.back.emit();
  }

}
