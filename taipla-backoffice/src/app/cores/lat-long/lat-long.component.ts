import { Component, Input, ViewRef, ChangeDetectorRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlValueAccessor, Validators, AbstractControl, FormGroup, NG_VALIDATORS, Validator } from '@angular/forms';
import { FormConfig, ControlType, CoordinateValue } from '@based/interfaces/FormConfig';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lat-long',
  templateUrl: './lat-long.component.html',
  styleUrls: ['./lat-long.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LatLongComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: LatLongComponent
    }
  ]
})
export class LatLongComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  coordinateValue: CoordinateValue;

  LAT_SUB: Subscription;
  LONG_SUB: Subscription;

  isChangeMode: boolean = false;
  get isEmpty() {
    const lat = this.controls[0].value ? this.controls[0].value : '';
    const long = this.controls[1].value ? this.controls[1].value : '';
    const result = lat + long;
    return result === '';
  }

  get latEmpty() {
    return this.controls[0].value === null || this.controls[0].value === '' || this.controls[0].value === undefined;
  }

  get longEmpty() {
    return this.controls[1].value === null || this.controls[1].value === '' || this.controls[1].value === undefined;
  }

  invalid: boolean = false;

  @Output() change = new EventEmitter<any>();

  _formGroup: FormGroup;
  set formGroup(formGroup: FormGroup) {
    if (formGroup) {
      this._formGroup = formGroup;
      let coordinateValue = undefined;

      this.inputNames.forEach((f, i) => {
        if (this._formGroup.controls[f.key]) {
          const coord = {};
          const key = this.getCoordinateValueWithKey(i);
          if (key) {
            coord[key] = this._formGroup.controls[f.key].value;
            if (coord[key]) {
              coordinateValue = {
                ...coordinateValue,
                ...coord
              };
            }
          }
        }
      });

      this.controls.forEach((ctrl, index) => {
        const KEY = (index === 0 ? 'LAT' : 'LONG');
        //this.createEvt();
        this.formGroup.setControl(this.inputNames[index].key, ctrl);
        this[`${KEY}_SUB`] = this.formGroup.controls[this.inputNames[index].key].valueChanges.pipe(debounceTime(0));
        this[`${KEY}_SUB`].subscribe(evt => {
          //=>trigger writeValue
          const coord = {};
          coord[KEY] = evt;
          this.writeValue(coord);

          //=>trigger onchange
          if (this.onChange !== undefined) { try { this.onChange(evt); } catch { } }
          if (this._config.change !== undefined && this._config.change !== null) {
            this._config.change(evt);
          } else {
            this.change.emit(evt);
          }
          //=>Re renderer display
          this.renderer();
        });
      });

      //=>สำหรับเปลี่ยนโหมด
      if (!this.coordinateValue && coordinateValue) {
        this.isChangeMode = true;
        this.writeValue(coordinateValue);
        const data = this.buildFormValue(coordinateValue);
        if (data) {
          this.formGroup.patchValue(data);
        }
      }

      this.renderer();
    }
  }

  get formGroup() {
    return this._formGroup || undefined;
  }

  get firstError() {
    const lat = this.controls[0].errors != null ? Object.keys(this.controls[0].errors)[0] : undefined;
    const long = this.controls[1].errors != null ? Object.keys(this.controls[1].errors)[0] : undefined;

    const first = {};

    if (lat && lat !== 'longitudeInvalid') {
      first[lat] = true;
      return first;
    }

    if (long && long !== 'latitudeInvalid') {
      first[long] = true;
      return first;
    }

    return undefined;
  }

  get latitudeError() {
    const lat = this.controls[0].errors != null ? Object.keys(this.controls[0].errors)[0] : undefined;
    if (lat) {
      return true;
    }
    return false;
  }

  get longitudeError() {
    const long = this.controls[1].errors != null ? Object.keys(this.controls[1].errors)[0] : undefined;
    if (long) {
      return true;
    }
    return false;
  }

  _config: FormConfig;
  @Input('config')
  set config(value: FormConfig) {
    if (value) {
      this._config = value;
      if (this._config.coordinate) {
        this.inputNames = [];
        this.inputNames.push({ key: this._config.coordinate.LAT, type: 'LAT' });
        this.inputNames.push({ key: this._config.coordinate.LONG, type: 'LONG' });

        if (this._config.disable === true) { this.controls.forEach(ctrl => ctrl.disable()); }
        if (this._config.coordinate) {
          if (this._config.coordinate.defaultValue) {
            if (this._config.coordinate.defaultValue.LAT && this._config.coordinate.defaultValue.LONG) {
              this.controls[0] = new FormControl(this._config.coordinate.defaultValue.LAT || null);
              this.controls[1] = new FormControl(this._config.coordinate.defaultValue.LONG || null);
            }
          }
        }

        this.readonly = this._config.readonly || this._config.view || false;
      }
    }
  }

  createEvt(builder: boolean = true) {
    this.controls.forEach((ctrl, index) => {
      let validators = [];
      if (this._config.required) { validators = validators.concat(Validators.required); }
      ctrl.setValidators(validators);
    });
  }

  setValid(index: any[]): void {
    index.map(i => {
      this.formGroup.controls[this.inputNames[i].key].setErrors(null);
    });
  }

  setInvalid(index: any[], validator: any): void {
    index.map(i => {
      this.formGroup.controls[this.inputNames[i].key].setErrors(validator);
    });
  }

  validate(control: AbstractControl): { [key: string]: any; } {
    let invalid;

    if (this.isEmpty) {
      if (this.formGroup) {
        this.setValid([0, 1]);
      }
      return null;
    }

    invalid = this.hasInvalidCoodinateThai(control);
    if (invalid) {
      return invalid;
    }

    //=>coordinate validate
    invalid = this.hasInvalidCoordinate();
    if (invalid) {
      return invalid;
    }

    //=>coordinate empty or not
    invalid = this.hasInvalidEmpty();
    if (invalid) {
      return invalid;
    }

    this.setValid([0, 1]);

    return null;
  }

  private hasInvalidEmpty(): any {

    let validate;

    if (!this.latEmpty && this.longEmpty) {

      this.inputNames.forEach((n, i) => {
        if (this.formGroup) {
          this.setInvalid([i], { invalid: true });
        }
      });

      validate = { invalid: true };
    }

    if (this.latEmpty && !this.longEmpty) {

      this.inputNames.forEach((n, i) => {
        if (this.formGroup) {
          this.setInvalid([i], { invalid: true });
        }
      });

      validate = { invalid: true };
    }

    return validate
  }

  private hasInvalidCoordinate(): any {
    let invalid;

    if (this._config.coordinate.coordinateValidate) {
      if (this.formGroup) {
        if (!this.isEmpty) {
          let _invalid = [];
          this.inputNames.forEach((n, i) => {
            const regex = new RegExp(/^((\d{1,3}))(\.\d+)*$/gi);
            const valid = regex.test(this.controls[i].value);
            if (!valid) {
              _invalid.push(valid);
              this.setInvalid([i], { coordinateInvalid: true });
            }
          });

          if (_invalid && _invalid.length > 0) {
            invalid = {
              coordinateInvalid: true
            }
          }
        }
      }
    }

    return invalid;
  }

  private hasInvalidCoodinateThai(control: AbstractControl) {
    let invalid;
    if (this._config.coordinate.coordinateThaiValidate) {
      if (!this.latEmpty && this.longEmpty) {
        const latValid = checkCoordinatesInThailand([this.controls[0].value], 'lat');
        this.setInvalid([1], { invalid: true });

        const type: any = this.getType(control.value);
        if (type) {
          const currentCtrl = checkCoordinatesInThailand([control.value], type);
          if (!currentCtrl) {
            if (type == 'lat') {
              this.setInvalid([0], { latitudeInvalid: true });
            } else {
              this.setInvalid([1], { longitudeInvalid: true });
            }
          }
        } else {
          control.setErrors({ invalid: true });
        }

        if (!latValid) {
          invalid = {
            latitudeInvalid: true
          }
        }
      } else if (this.latEmpty && !this.longEmpty) {
        const longValid = checkCoordinatesInThailand([this.controls[1].value], 'long');
        this.setInvalid([0], { invalid: true });
        const type: any = this.getType(control.value);
        if (type) {
          const currentCtrl = checkCoordinatesInThailand([control.value], type);
          if (!currentCtrl) {
            if (type == 'lat') {
              this.setInvalid([0], { latitudeInvalid: true });
            } else {
              this.setInvalid([1], { longitudeInvalid: true });
            }
          } else {
            control.setErrors({ invalid: true });
          }
        }

        if (!longValid) {
          invalid = {
            longitudeInvalid: true
          }
        }
      } else {
        const latValid = checkCoordinatesInThailand([this.controls[0].value], 'lat');
        const longValid = checkCoordinatesInThailand([this.controls[1].value], 'long');

        if (!latValid && longValid) {
          this.formGroup.controls[this.inputNames[0].key].setErrors({ latitudeInvalid: true });
          this.setInvalid([0], { latitudeInvalid: true });
          this.setValid([1]);
          invalid = {
            invalid: true
          }
        }

        if (!invalid) {
          if (latValid && !longValid) {
            this.setValid([0]);
            this.setInvalid([1], { longitudeInValid: true });
            invalid = {
              invalid: true
            }
          }
        }

        if (!invalid) {
          if (!latValid && !longValid) {
            this.setInvalid([0, 1], { latitudeLongitudeInvalid: true });
            invalid = {
              latitudeLongitudeInvalid: true
            }
          }
        }

        if (latValid && longValid) {
          this.setValid([0, 1]);
        }
      }
    }
    return invalid;
  }

  readonly: boolean = false;

  inputNames: any[];
  controls: FormControl[];
  onChange: (value: any) => void;

  get hasError(): boolean {
    const errors = this.controls.map(ctrl => ctrl.invalid).filter(f => f) || [];
    return errors.length > 0;
  }

  get placeholderLat(): string {
    return (this._config && this._config.placeholder && this._config.placeholder[0]) ? this._config.placeholder[0] : 'LATITUDE';
  }

  get placeholderLong(): string {
    return (this._config && this._config.placeholder && this._config.placeholder[1]) ? this._config.placeholder[1] : 'LONGITUDE';
  }

  constructor(private cdr: ChangeDetectorRef) {
    (window as any).coord = this;
    this.controls = [];
    this.controls.push(new FormControl()); //=>LAT
    this.controls.push(new FormControl()); //=>LONG
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.LAT_SUB) {
      this.LAT_SUB.unsubscribe();
    }
    if (this.LONG_SUB) {
      this.LONG_SUB.unsubscribe();
    }
  }

  touched(evt: any) {
    if (this._config.blur !== undefined && this._config.blur !== null) {
      this._config.blur({
        LAT: this.formatDecimal(this.controls[0].value, this._config.coordinate.decimalPlaces),
        LONG: this.formatDecimal(this.controls[1].value, this._config.coordinate.decimalPlaces)
      });
    }

    if (this._config.coordinate.blur !== undefined && this._config.coordinate.blur !== null) {
      this.onLatLongChanged();
    }
  }

  onLatLongChanged() {
    const invalid = this.inputNames.map((c, i) => {
      return this.controls[i].invalid;
    }).filter(f => f) || [];

    if (invalid && invalid.length <= 0) {
      this._config.coordinate.blur({
        LAT: this.formatDecimal(this.controls[0].value, this._config.coordinate.decimalPlaces),
        LONG: this.formatDecimal(this.controls[1].value, this._config.coordinate.decimalPlaces)
      });
    }
  }

  public onTouched: () => void = () => { }

  allowInput(evt: any) {
    const regex = new RegExp(/^((\d{1,3})|\.)(\.\d+)*$/gi);
    let isAllow = regex.test(evt.key);

    if (evt.target.value.includes('.') && evt.key === '.') {
      //=>duplicate dot
      return false;
    }

    if (this._config.coordinate.decimalPlaces && isAllow) {
      //=>selection for remove text
      const selection = window.getSelection().toString();
      let text = evt.target.value.split('')
      text.splice(evt.target.selectionStart, selection.length, evt.key);
      text = text.join('');
      if (text.includes('.')) {
        const split = text.split('.');
        const valid = split[1].length <= this._config.coordinate.decimalPlaces;
        isAllow = valid;
      }
    }

    return isAllow;
  }

  checkOnPaste(evt: any) {
    let clipboardData = evt.clipboardData;
    let value = clipboardData.getData('text');
    const regex = new RegExp(/^((\d{1,3})|\.)(\.\d+)*$/gi);
    let isAllow = regex.test(value);

    if (this._config.coordinate.decimalPlaces && isAllow) {
      if (value.includes('.')) {
        const text = value;
        const split = text.split('.');
        if (split && split.length === 2) {
          const valid = split[1].length <= this._config.coordinate.decimalPlaces;
          isAllow = valid;
        } else if (split && split.length > 2) {
          isAllow = false;
        }
      }
    }

    return isAllow;
  }

  /* Form Control */
  writeValue(values: CoordinateValue): void {
    //console.log('writeValie', values);
    if (values) {
      this.coordinateValue = {
        ...this.coordinateValue,
        ...values
      }
    }
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.controls.forEach(ctrl => ctrl.disable());
    } else {
      this.controls.forEach(ctrl => ctrl.enable());
    }
  }
  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  private getCoordinateValueWithKey(index: number) {
    let keys = ['LAT', 'LONG'];
    const getKey = (keys && keys[index]) ? keys[index] : undefined;
    return getKey ? getKey : undefined;
  }

  private getCoordinateValueWithValue(index: number) {
    const getKey = this.getCoordinateValueWithKey(index);
    const getValue = (getKey) ? this.coordinateValue[getKey] : undefined;
    return getValue ? getValue : undefined;
  }

  private buildFormValue(coordinate: CoordinateValue) {
    let data: any = undefined;
    if (coordinate) {
      Object.keys(coordinate).forEach((f, i) => {
        const value = coordinate[f];
        if (value) {
          const applyValue = {};
          applyValue[this.inputNames[i].key] = this.formatDecimal(value, 6);
          data = {
            ...data,
            ...applyValue
          }
        }
      });
    }
    return data;
  }

  private buildCoordinateValue(coord: any) {
    let data: any = undefined;
    Object.keys(coord).forEach((f, i) => {
      const value = this.getCoordinateValueWithValue(i);
      if (value) {
        const applyValue = {};
        applyValue[this.inputNames[i].key] = value;
        data = {
          ...data,
          ...applyValue
        }
      }
    });
    return data;
  }

  getType(value: any): string {
    const lat = [5, 21];
    const long = [97, 107];
    if (value >= lat[0] && value <= lat[1]) {
      return 'lat';
    } else if (value >= long[0] && value <= long[1]) {
      return 'long';
    } else {
      return undefined;
    }
  }

  test() {
    console.log('test.blur');
  }

  formatDecimal(value: number, decimalPlaces?: number) {
    if (value === null) {
      return value;
    }

    if (decimalPlaces) {
      return Number(value).toFixed(decimalPlaces);
    }

    return value;
  }
}

export function checkCoordinatesInThailand(coord: any[], type: 'all' | 'lat' | 'long' = 'all') {
  let check = [];
  let area = [
    { long: [97, 107] },
    { lat: [5, 21] }
  ]

  switch (type) {
    case "lat":
      area = [...area.filter(f => f.lat)];
      break;
    case "long":
      area = [...area.filter(f => f.long)];
      break;
    default:
  }

  area.forEach((point: any) => {
    if (point.long) {
      const min = Math.round(point.long[0]);
      const max = Math.ceil(point.long[1]);
      const index = 0;
      check = check.concat(...[coord[index] >= min, coord[index] <= max]);
    } else {
      const min = Math.round(point.lat[0]);
      const max = Math.ceil(point.lat[1]);
      const index = coord[1] ? 1 : 0;
      check = check.concat(...[coord[index] >= min, coord[index] <= max]);
    }
  });

  const valid = check.filter(f => !f).length <= 0;
  return valid;
}
