import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ControlType, FormConfig } from '@app/based/interfaces/FormConfig';


@Component({
  selector: 'app-legend-manager',
  templateUrl: './legend-manager.component.html',
  styleUrls: ['./legend-manager.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LegendManagerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LegendManagerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendManagerComponent implements ControlValueAccessor, Validators {
  values: Array<FormConfig[]> = undefined;

  formConfig: FormConfig[] = [
    {
      key: 'ID',
      invisible: true
    },
    {
      key: 'LEGEND_TYPE',
      label: 'ประเภทตำนาน',
      type: ControlType.select,
      placeholder: 'ประเภทตำนาน',
      lookup: [
        {
          CODE: 1,
          DESCR: 'ตำนานอาหาร'
        },
        {
          CODE: 2,
          DESCR: 'ตำนานอาหารของร้านอาหาร'
        }
      ],
      errorMessages: {
        required: 'เลือกประเภทตำนาน'
      }
    },
    {
      key: 'DESCRIPTION',
      label: 'คำอธิบาย',
      type: ControlType.textarea,
      placeholder: 'คำอธิบาย'
    },
    {
      key: 'CODE',
      invisible: true
    },
    {
      key: 'THUMBNAIL',
      label: 'รูปภาพตำนาน',
      type: ControlType.upload,
      placeholder: 'เลือกรูปภาพตำนาน',
      allowFileType: 'image/jpeg,image/jpg,/image/png',
      multiple: true,
      limit: 5,
      size: 10485760,
      preview: false,
      listType: 'picture-card',
      errorMessages: {
        uploadFormat: 'รองรับเฉพาะ JPG, JPEG และ PNG',
        uploadSize: 'รองรับขนาดไฟล์ไม่เกิน 10 MB',
        uploadLimit: 'อัพโหลดได้ไม่เกิน 5 รูปภาพ'
      }
    }
  ];

  readonly: boolean = false;

  @Input('control')
  control: FormControl;

  public onChange: (value: any) => void;
  public onTouched: () => void = () => { }

  _config: FormConfig;
  @Input('config')
  set config(value: FormConfig) {
    if (value) {
      this._config = value;
      this.control = new FormControl(value.defaultValue || null);
      this.readonly = value.readonly || value.view || false;

      //=>Single
      if (!this._config.multiple) {
        this._config.limit = 1;
        if (this._config.useDefault) {
          this.addLegend(null);
        }
      }
    }
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

  set value(values: Array<FormConfig[]>) {
    if (values && values.length > 0) {
      this.writeValue(values);
    } else {
      this.writeValue(undefined);
    }
  }

  get isMultiple() {
    return this._config.multiple;
  }

  get isLimit() {
    let limit = this._config.limit || 3;
    let length = (this.values) ? this.values.length : 0;
    return length >= limit;
  }

  constructor(private cdr: ChangeDetectorRef) {
    (window as any).legend = this;
  }

  validate({ value }: FormControl) {
    // let valid: any = undefined;
    // let inValid: any = null;

    // if (this._config.errorMessages) {
    //   Object.keys(this._config.errorMessages).forEach((key: any) => {
    //     if (inValid) return;
    //     inValid = this.checkValidator(key, value);
    //     if (inValid) valid = true;
    //   });
    // }

    // this.control.setErrors(inValid);

    // return inValid;
    return null;
  }

  writeValue(values: Array<FormConfig[]>): void {
    setTimeout(() => {
      if (values) {
        this.control.setValue(values);
      } else {
        this.control.setValue(undefined);
      }
    });
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

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  //=>Legend
  addLegend(evt: any) {
    evt && evt.preventDefault && evt.preventDefault();
    evt && evt.stopPropagation && evt.stopPropagation();

    if (!this.values) {
      this.values = [];
    }

    if (evt && !(evt instanceof Event)) {
      console.log('ok');
    } else {
      this.addLegendDefault(evt);
    }
  }

  addLegendDefault(evt: any) {
    this.values.push([...this.formConfig]);
    this.renderer();
  }

  removeLegend(evt: any, idx: number) {
    if (!this.values) {
      this.values = [];
      this.renderer();
      return;
    }

    this.values.splice(idx, 1);

    if (this.values.length === 0) {
      this.values = undefined;
    }

    this.renderer();
  }

  isLastest(index: number, len: number) {
    return index < (len - 1)
  }
}
