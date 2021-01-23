import { Component, OnInit, ViewChildren, Input, ViewRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '@based/services/app.service';
import { ControlComponent } from '@cores/control/control.component';
import { FormConfig, ControlType, ValidatorMessage } from '@based/interfaces/FormConfig';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @ViewChildren(ControlComponent) controls: any;

  _configs: FormConfig[]
  @Input('configs')
  set configs(value: FormConfig[]) {
    if (value) {
      this._configs = value.map((cfg) => {
        cfg.label = (cfg.label !== undefined) ? cfg.label : '';
        cfg.type = (cfg.type !== undefined) ? cfg.type : ControlType.text;
        return cfg;
      });
      this.initFormGroup();
    }
  }

  defaultMessage: ValidatorMessage = {
    required: 'กรุณากรอกข้อมูล',
    regex: 'รูปแบบข้อมูลไม่ถูกต้อง',
    email: 'รองรับเฉพาะรูปแบบอีเมลเท่านั้น',
    minLength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
    maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
    date: 'ป้อนรูปแบบวันที่ YYYY-MM-DD'
  };

  formGroup: FormGroup;

  @Input()
  isMultipart: boolean = false;

  isSubmited: boolean = false;

  constructor(private app: AppService, private cdr: ChangeDetectorRef) {
    (window as any).form = this;
  }

  initFormGroup() {
    this.isSubmited = false;
    const formcontrols = {};
    this._configs.forEach(item => {
      formcontrols[item.key] = new FormControl(item.defaultValue || null);
      if (item.disable === true) { formcontrols[item.key].disable(); }
      let validators = [];
      if (item.errorMessages !== undefined) {
        Object.keys(item.errorMessages).forEach((key: any) => {
          validators = this.setValidator(item, validators,
            key,
            item.errorMessages[key] || this.defaultMessage[key]);
        });

      } else {
        if (item.required === true) { validators = validators.concat(Validators.required); }
        if (item.regex) { validators = validators.concat(Validators.pattern(item.regex)); }
      }

      formcontrols[item.key].setValidators(validators);
    });
    this.formGroup = new FormGroup(formcontrols);
  }

  getFormData() {
    return { ... this.formGroup.getRawValue() };
  }

  setFormData(data: any) {
    this.formGroup.patchValue(data);
  }

  setViewMode() {
    this._configs = this._configs.map((cfg) => { let config = { ...cfg }; config.view = true; return config; });
  }

  setEditMode() {
    this._configs = this._configs.map((cfg) => { let config = { ...cfg }; config.view = false; return config; });
  }

  setConfig(key: string, config: FormConfig) {
    if (key && key !== '') {
      const index = this._configs.findIndex(f => f.key === key); if (index && this._configs[index]) { this._configs[index] = { ...config }; }
    }
  }

  getControl(key: string) {
    return this.controls._results.find(f => f.inputName === key) || undefined;
  }

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  private setValidator(config: any, validators: any[], key: string, message: string): any[] {
    switch (key.toLocaleLowerCase()) {
      case "required":
        validators = validators.concat(Validators.required);
        break;

      case "regex":
        validators = validators.concat(Validators.pattern(config.regex));
        break;

      case "email":
        // validators = validators.concat(Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/));
        validators = validators.concat(Validators.email);
        break;

      case "minlength":
        validators = validators.concat(Validators.minLength(config.min));
        break;

      case "maxlength":
        validators = validators.concat(Validators.maxLength(config.max));
        break;

      case "date":
        validators = validators.concat(Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gi));
        break;
    }

    return validators;
  }

  isValid(displayError: boolean = true): boolean {
    this.isSubmited = true;
    const valid = this.formGroup.valid;
    let message = this.app.message.ERROR.INVALID;

    if (!valid && displayError) {
      this.app.showWarning(message);
    }

    return valid;
  }
}
