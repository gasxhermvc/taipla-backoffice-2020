import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { BaseClass } from '@based/classes/base-class';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';
import { CountryService } from '@backoffice/services/country.service';

@Component({
  selector: 'app-country-manage-add',
  templateUrl: './country-manage-add.component.html',
  styleUrls: ['./country-manage-add.component.scss']
})
export class CountryManageAddComponent extends BaseClass implements OnInit {

  formConfig: FormConfig[];

  @Output() back = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  get service(): CountryService {
    return this.store['country'];
  }

  constructor(injector: Injector) {
    super(injector);
    (window as any).cma = this;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initConfig();
    }, 0);
  }

  initConfig() {
    this.formConfig = [
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

  async onSave() {
    this.showLoading();
    if (this.form.isValid(false)) {
      let param = [];
      const data = this.form.getFormData();
      param.push(data);
      const result = await this.service.addCountry(param);
      if (result) {
        this.app.showSuccess(this.app.message.SUCCESS.INSERT);
        this.onBack();
        this.complete.emit();
      } else {
        this.app.showError(this.app.message.ERROR.INSERT);
      }
    } else {
      this.app.showError(this.app.message.ERROR.INVALID);
    }

    this.hideLoading();
  }

  onClear() {
    if (this.form) {
      this.form.initFormGroup();
    }
  }

  onBack() {
    this.back.emit();
  }

}
