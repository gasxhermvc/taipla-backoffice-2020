import { Component, ChangeDetectionStrategy, ViewRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, Validators } from '@angular/forms';
import { ControlType, FormConfig, ValidatorMessage, ERROR_TYPE_TEXT } from '@based/interfaces/FormConfig';
import { DatetimeService } from '@based/services/datetime.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements ControlValueAccessor {

  CONTROL_TYPE = ControlType;
  inputName: string;

  defaultMessage: ValidatorMessage = {
    required: 'กรุณากรอกข้อมูล',
    regex: 'รูปแบบข้อมูลไม่ถูกต้อง',
    email: 'รองรับเฉพาะรูปแบบอีเมลเท่านั้น',
    minLength: 'กรุณาป้อนอย่างน้อย 4 ตัวอักษร',
    maxLength: 'กรุณาป้อนไม่เกิน 150 ตัวอักษร',
    date: 'ป้อนรูปแบบวันที่ YYYY-MM-DD'
  };

  _config: FormConfig;
  @Input('config')
  set config(value: FormConfig) {
    if (value) {
      this._config = value;
      this.inputName = this._config.key;
      if (this.control === undefined) {
        this.checkDate();
        this.control = new FormControl(this._config.defaultValue || null);
      }

      if (this._config.disable === true) { this.control.disable(); }
      let validators = [];

      if (this._config.errorMessages !== undefined) {
        Object.keys(this._config.errorMessages).forEach((key: any) => {
          validators = this.setValidator(validators,
            key,
            this._config.errorMessages[key] || this.defaultMessage[key]);
        });

      } else {
        if (this._config.required === true) { validators = validators.concat(Validators.required); }
        if (this._config.regex) { validators = validators.concat(Validators.pattern(this._config.regex)); }
      }

      this.control.setValidators(validators);

      if (this._config.delay !== undefined && this._config.delay > 0) {
        this.control.valueChanges.pipe(debounceTime(this._config.delay)).subscribe((evt) => {
          if (this.onChange !== undefined) { try { this.onChange(evt); } catch{ } }
          if (this._config.change !== undefined && this._config.change !== null) {
            this._config.change(evt);
          } else {
            this.change.emit(evt);
          }
          this.renderer();
        });
      } else {
        this.control.valueChanges.subscribe((evt) => {
          if (this.onChange !== undefined) { try { this.onChange(evt); } catch{ } }
          if (this._config.change !== undefined && this._config.change !== null) {
            this._config.change(evt);
          } else {
            this.change.emit(evt);
          }
          this.renderer();
        });
      }


      this.renderer();
    }
  }

  @Output() change = new EventEmitter();

  control: FormControl;
  public onChange: (value: any) => void;
  public onTouched: () => void = () => { }

  touched() {
    if (this._config.blur !== undefined && this._config.blur !== null) {
      this._config.blur(this.control.value);
    }
  }

  errorMessage(): string {
    const keys = Object.keys(this.control.errors).map(k => (k && k !== undefined) ? k.toLowerCase() : '') || [];

    if (keys && keys.length > 0) {
      return this._config.errorMessages[ERROR_TYPE_TEXT[keys[0]]] || this.defaultMessage[ERROR_TYPE_TEXT[keys[0]]] || ''
    }

    return '';
  }


  get display(): 'input' | 'readonly' {
    if (this._config) {
      switch (this._config.type) {
        default:
          if (this._config.readonly || this._config.view) {
            return 'readonly';
          } else {
            return 'input';
          }
      }
    } else {
      return 'input';
    }
  }

  options?: [];
  constructor(private cdr: ChangeDetectorRef, private datetime: DatetimeService) {
    this.control = new FormControl();
  }

  set value(value: any) {
    if (value) {
      this.writeValue(value);
    }
  }

  writeValue(value: any): void {
    setTimeout(() => {
      this.control.setValue(value);
    }, 0);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  checkDate() {
    if (this._config.type === ControlType.date) {
      if (this._config.defaultValue && this._config.type === ControlType.date) {
        this._config.defaultValue = this.datetime.convertDate(this._config.defaultValue,
          this._config.format != undefined ? this._config.format : 'DD/MM/YYYY');
      }
    }

    if (this._config.type === ControlType.daterange) {
      if (this._config.defaultValue && this._config.defaultValue.length >= 2
        && this._config.type === ControlType.daterange) {
        this._config.defaultValue[0] = this.datetime.convertDate(this._config.defaultValue[0],
          this._config.format != undefined ? this._config.format : 'DD/MM/YYYY');

        this._config.defaultValue[1] = this.datetime.convertDate(this._config.defaultValue[1],
          this._config.format != undefined ? this._config.format : 'DD/MM/YYYY');
      }
    }
  }

  getLookupData(value: any) {
    if (value != null) {
      const data = this._config.lookup.find(f => f.CODE === value);
      return data ? data.DESCR : '-';
    } else {
      return '-';
    }
  }

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  private setValidator(validators: any[], key: string, message: string): any[] {
    switch (key.toLocaleLowerCase()) {
      case "required":
        validators = validators.concat(Validators.required);
        break;

      case "regex":
        validators = validators.concat(Validators.pattern(this._config.regex));
        break;

      case "email":
        // validators = validators.concat(Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/));
        validators = validators.concat(Validators.email);
        break;

      case "minlength":
        validators = validators.concat(Validators.minLength(this._config.min || 4));
        break;

      case "maxlength":
        validators = validators.concat(Validators.maxLength(this._config.max || 150));
        break;

      case "date":
        validators = validators.concat(Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gi));
        break;
    }

    return validators;
  }
}
