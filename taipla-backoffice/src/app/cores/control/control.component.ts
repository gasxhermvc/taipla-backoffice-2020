import { Component, ChangeDetectionStrategy, ViewRef, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { ControlType, FormConfig, ValidatorMessage, ERROR_TYPE_TEXT } from '@based/interfaces/FormConfig';
import { DatetimeService } from '@based/services/datetime.service';
import { debounceTime } from 'rxjs/operators';
import message from "@assets/messages/message.json";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ControlComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements ControlValueAccessor, Validators {

  CONTROL_TYPE = ControlType;
  inputName: string;
  loading = false;

  defaultMessage: ValidatorMessage = {
    required: message.INPUT.VALIDATOR.REQUIRED,
    regex: message.INPUT.VALIDATOR.REGEX,
    email: message.INPUT.VALIDATOR.EMAIL,
    phone: message.INPUT.VALIDATOR.PHONE,
    uploadFormat: message.INPUT.VALIDATOR.UPLOAD_FORMAT,
    uploadSize: message.INPUT.VALIDATOR.UPLOAD_SIZE,
    minLength: message.INPUT.VALIDATOR.MIN_LENGTH,
    maxLength: message.INPUT.VALIDATOR.MAX_LENGTH,
    date: message.INPUT.VALIDATOR.DATE
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

      // if (this._config.errorMessages !== undefined) {
      //   Object.keys(this._config.errorMessages).forEach((key: any) => {
      //     validators = this.setValidator(validators,
      //       key,
      //       this._config.errorMessages[key] || this.defaultMessage[key]);
      //   });

      // } else {
      //   if (this._config.required === true) { validators = validators.concat(Validators.required); }
      //   if (this._config.regex) { validators = validators.concat(Validators.pattern(this._config.regex)); }
      // }

      // this.control.setValidators(validators);

      if (this._config.delay !== undefined && this._config.delay > 0) {
        this.control.valueChanges.pipe(debounceTime(this._config.delay)).subscribe((evt) => {
          if (this.onChange !== undefined) { try { this.onChange(evt); } catch { } }
          if (this._config.change !== undefined && this._config.change !== null) {
            this._config.change(evt);
          } else {
            this.change.emit(evt);
          }
          this.renderer();
        });
      } else {
        this.control.valueChanges.subscribe((evt) => {
          if (this.onChange !== undefined) { try { this.onChange(evt); } catch { } }
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
    const keys = (this.control.errors) ?
      Object.keys(this.control.errors).map(k => (k && k !== undefined) ? k.toLowerCase() : '') || [] : [];

    if (keys && keys.length > 0) {
      return this._config.errorMessages[this.getErrorKey()] || this.defaultMessage[this.getErrorKey()] || ''
    }

    return '';
  }

  getErrorKey(): string {
    const keys = (this.control.errors) ?
      Object.keys(this.control.errors).map(k => (k && k !== undefined) ? k.toLowerCase() : '') || [] : [];

    if (keys && keys.length > 0) {
      return ERROR_TYPE_TEXT[keys[0]];
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
        validators = validators.concat(Validators.email);
        break;

      case "phone":
        validators = validators.concat(Validators.pattern(/^(?=[0|\+66|66])(([0|\+66|66]|[0-9]){2,10}?).*((((\d){7}|(\d){3}|\-(\d){3})?((\d){4}|\-(\d){4})|(\d){7})?)[+?(\-(\d){3,5})]$/g));
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

  checkValidator(key: any, value: any): any {
    let invalid = null;

    switch (key.toLocaleLowerCase()) {
      case "required":
        if (value === undefined || value === null || value === '') {
          invalid = {
            required: this._config.errorMessages.required,
            invalid: true
          };
        }
        break;
      case "regex":
        if (!this._config.regex.test(value)) {
          invalid = {
            regex: this._config.errorMessages.regex,
            invalid: true
          };
        }
        break;

      case "email":
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gi;
        if (!emailPattern.test(value)) {
          invalid = {
            email: this._config.errorMessages.email,
            invalid: true
          };
        }
        break;

      case "phone":
        let phonePattern = /^(0|\+66|(66)){1,3}([1-9]){1}(?!\-)([1-9]{1})?(-)?([0-9]{3}?(-)?([0-9]{4}?(-)?[0-9]{0,5}))$/gi;
        if (!phonePattern.test(value)) {
          invalid = {
            phone: this._config.errorMessages.phone,
            invalid: true
          };
        }
        break;
      case "minlength":
        if (value) {
          if (value != '' && value.length < this._config.min) {
            invalid = {
              minLength: this._config.errorMessages.minLength,
              invalid: true
            };
          }
        }
        break;

      case "maxlength":
        if (value) {
          if (value != '' && value.length > this._config.max) {
            invalid = {
              maxLength: this._config.errorMessages.maxLength,
              invalid: true
            };
          }
        }
        break;

      case "date":
        let datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gi;
        if (!datePattern.test(value)) {
          invalid = {
            date: this._config.errorMessages.date,
            invalid: true
          };
        }
        break;
    }

    return invalid;
  }

  validate({ value }: FormControl) {
    let valid: any = undefined;
    let inValid: any = null;

    Object.keys(this._config.errorMessages).forEach((key: any) => {
      if (inValid) return;
      inValid = this.checkValidator(key, value);
      if (inValid) valid = true;
    });

    this.control.setErrors(inValid);

    return inValid;
  }

  // beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
  //   return new Observable((observer: Observer<boolean>) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //     if (!isJpgOrPng) {
  //       this.msg.error('You can only upload JPG file!');
  //       observer.complete();
  //       return;
  //     }
  //     const isLt2M = file.size! / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.msg.error('Image must smaller than 2MB!');
  //       observer.complete();
  //       return;
  //     }
  //     observer.next(isJpgOrPng && isLt2M);
  //     observer.complete();
  //   });
  // };

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result!.toString()));
  //   reader.readAsDataURL(img);
  // }

  // handleChange(info: { file: NzUploadFile }): void {
  //   switch (info.file.status) {
  //     case 'uploading':
  //       this.loading = true;
  //       break;
  //     case 'done':
  //       // Get this url from response in real world.
  //       this.getBase64(info.file!.originFileObj!, (img: string) => {
  //         this.loading = false;
  //         this.avatarUrl = img;
  //       });
  //       break;
  //     case 'error':
  //       this.msg.error('Network error');
  //       this.loading = false;
  //       break;
  //   }
  // }
}
