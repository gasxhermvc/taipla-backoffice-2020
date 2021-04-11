import { Component, ChangeDetectionStrategy, ViewRef, ChangeDetectorRef, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { ControlType, FormConfig, ValidatorMessage, ERROR_TYPE_TEXT } from '@based/interfaces/FormConfig';
import { DatetimeService } from '@based/services/datetime.service';
import { debounceTime, map } from 'rxjs/operators';
import message from "@assets/messages/message.json";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ControlComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements ControlValueAccessor, Validators {

  CONTROL_TYPE = ControlType;
  inputName: string;
  loading = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  defaultMessage: ValidatorMessage = {
    required: message.INPUT.VALIDATOR.REQUIRED,
    regex: message.INPUT.VALIDATOR.REGEX,
    email: message.INPUT.VALIDATOR.EMAIL,
    phone: message.INPUT.VALIDATOR.PHONE,
    uploadFormat: message.INPUT.VALIDATOR.UPLOAD_FORMAT,
    uploadSize: message.INPUT.VALIDATOR.UPLOAD_SIZE,
    // uploadLimit: message.INPUT.VALIDATOR.UPLOAD_LIMIT,
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

      if (this._config.fileList && this._config.fileList.length > 0) {
        this.fileList = [].concat(...this._config.fileList);
      }

      if (this._config.disable === true) { this.control.disable(); }

      if (this._config.type == ControlType.upload) {
        if (this._config.limit === undefined) {
          this._config.limit = (this._config.multiple ? 10 : 1);
        }
      }

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


  get display(): 'input' | 'legend' | 'readonly' {
    if (this._config) {
      switch (this._config.type) {
        case ControlType.legend:
          return 'legend';
          break;
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
  constructor(private cdr: ChangeDetectorRef, private datetime: DatetimeService, private msg: NzMessageService) {
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
      const data = this._config.lookup.find(f => f[(this._config?.lookupKey || 'CODE')] === value);
      return data ? data[(this._config?.lookupKey || 'DESCR')] : '-';
    } else {
      return '-';
    }
  }

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
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

    if (this._config.errorMessages) {
      Object.keys(this._config.errorMessages).forEach((key: any) => {
        if (inValid) return;
        inValid = this.checkValidator(key, value);
        if (inValid) valid = true;
      });
    }

    this.control.setErrors(inValid);

    return inValid;
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    this.loading = true;
    this.renderer();
    return new Observable((observer: Observer<boolean>) => {
      let fileType = this._config.allowFileType.split(',');
      let allowFileType = fileType.indexOf(file.type) !== -1;

      if (!allowFileType) {
        this.msg.error(this._config.errorMessages.uploadFormat);
        observer.complete();
        return;
      }

      let allowFileSize = file.size < this._config.size;
      if (!allowFileSize) {
        this.msg.error(this._config.errorMessages.uploadSize);
        observer.complete();
        return;
      }

      const generate = new Promise((resolve: any, reject: any) => {
        try {
          this.getBase64(file as any, (img: string) => {
            file.preview = img;
            if (!this._config.multiple) {
              this._config.avatarUrl = img;
            } else {
              file.url = img;
              file.preview = img;
            }
            this.fileList = [...this.fileList].concat(file);
            resolve();
          });
        } catch (e) {
          reject(e);
        }
      });

      generate.then(() => {
        observer.next(false);
        observer.complete();
      }, err => {
        console.log(err);
        observer.next(false);
        observer.complete();
      });
    }).pipe(
      map((success) => {
        this.loading = false;
        this.renderer();
        return success;
      }));
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!, (img: string) => {
        this.loading = false;
        this._config.avatarUrl = img;

        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      });
    } else {
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    }

    return false;
  };


  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this._config.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
