import { Component, OnInit, ViewChildren, Input, ViewRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '@based/services/app.service';
import { ControlComponent } from '@cores/control/control.component';
import { FormConfig, ControlType } from '@based/interfaces/FormConfig';

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

  formGroup: FormGroup;

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
      if (item.required === true) { validators = validators.concat(Validators.required); }
      if (item.regex) { validators = validators.concat(Validators.pattern(item.regex)); }
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

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
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
