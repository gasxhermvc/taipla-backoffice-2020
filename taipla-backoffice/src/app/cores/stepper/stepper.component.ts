import { Component, OnInit, ViewRef, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { isArray } from 'util';
import { StepperConfig } from '@app/based/interfaces/StepperConfig';
import { FormStepStatus, ButtonStep, Stepper, ButtonStepTemplate } from '@cores/stepper/stepper.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  public _fw: Stepper = null;

  @Input('className')
  className: any = {
    formStep: '',
    formNavigatorBefore: '',
    formNavigator: '',
    formNavigatorAfter: '',
    formArea: '',
    formFooter: ''
  };

  @Output()
  public onCreate = new EventEmitter();

  @Output()
  public onDestroy = new EventEmitter();

  @Output()
  public onGoto = new EventEmitter<any>();

  @Output()
  public onNext = new EventEmitter<any>();

  @Output()
  public onPrev = new EventEmitter<any>();

  @Output()
  public onFinish = new EventEmitter<any>();

  @Output()
  public onClick = new EventEmitter<any>();

  @Output()
  public onChange = new EventEmitter<any>();

  private _steps: Array<StepperConfig> = [];

  @Input()
  set steps(steps: Array<StepperConfig>) {
    if (steps != null) {
      this.patch(steps);
    }
  }

  get steps() {
    return this._steps;
  }

  _current: number = 0;

  @Input()
  set current(current: number) {
    if (current) {
      this.setCurrent(current);
    }
  }

  get current() {
    return this._current;
  }

  @Input() clickStep: boolean = true;

  _disabled: boolean;
  @Input()
  set disabled(disabled: any) {
    if (disabled !== undefined && disabled !== null) {
      setTimeout(() => {
        this.disabledAll();
      }, 0);
    }
  }

  get disabled() {
    return this._disabled;
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnInit() {
    if (this._fw) {
      this._fw.clickStep = this.clickStep;
    }
    this.onCreate.emit();
  }

  ngDestroy() {
    this.onDestroy.emit();
  }

  patch(steps: Array<StepperConfig>) {
    if (steps != null && isArray(steps)) {
      let __steps = Object.assign([], steps);
      __steps = this.stepBuilder(__steps);

      this._steps = [].concat(__steps);
      this._fw = this.formBuilder(__steps);
      this.renderer();
    }
  }

  onClickToStep(evt: any, index: number) {
    if (this._fw.current === (index + 1)) {
      return;
    }

    const oldStep = { ...this._fw.steps[(this._fw.current - 1)] };

    this.deactivated(index, (this._fw.current - 1), this._fw.steps);

    this.goto(index, this._fw.steps);

    this.onClick.emit({ oldStep: oldStep, currentStep: this._fw.currentStep, current: index + 1 });
    this.renderer();
  }

  prev() {
    let currentIndex = (this._fw.current - 1);

    if (!this.hasPrev(this._fw.steps)) {
      return;
    }

    const steps = [].concat(...this._fw.steps);
    const oldStep = steps[currentIndex];
    steps[currentIndex].active = false;

    this.goto((currentIndex - 1), steps);

    this.onPrev.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex });
    //this.onChnage.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex });
    this.renderer();
  }

  next() {
    let currentIndex = (this._fw.current - 1);

    if (this.hasNext(this._fw.steps) && this.hasFinish(this._fw.steps, currentIndex)) {
      return;
    }

    const steps = [].concat(...this._fw.steps);
    const oldStep = steps[(currentIndex)];

    steps[(currentIndex + 1)].active = true;
    steps[(currentIndex + 1)].disabled = false;

    this.goto((currentIndex + 1), steps);

    this.onNext.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex + 2 });
    //this.onChnage.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex + 2 });
    this.renderer();
  }

  finish() {
    let currentIndex = (this._fw.current - 1);

    if (this.hasNext(this._fw.steps) && this.hasFinish(this._fw.steps, currentIndex)) {
      return;
    }

    const steps = [].concat(...this._fw.steps);
    const oldStep = steps[(currentIndex)];

    steps[(currentIndex + 1)].active = true;
    steps[(currentIndex + 1)].disabled = false;

    this.goto((currentIndex + 1), steps);

    this.onFinish.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex + 2 });
    //this.onChnage.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: currentIndex + 2 });
  }


  disabledAll() {
    this._fw.steps.map((step: StepperConfig) => step.disabled = true);
    this.renderer();
  }

  goto(index: number, steps: Array<StepperConfig>) {
    if (index < 0 || index > (steps.length - 1)) {
      return;
    }

    if (steps[index].disabled) {
      return;
    }

    const oldStep = { ...steps[(this._fw.current - 1)] };
    oldStep.disabled = true;
    oldStep.active = false;

    this._fw = {
      ...this._fw,
      current: index + 1,
      steps: steps,
      status: this.mapStatus(this.hasFinish(steps, index)),
      currentStep: this.getCurrent(steps),
      button: this.renderButton(this._fw, index)
    };

    this.onGoto.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: (index + 1) });

    if (this.mapStatus(this.hasFinish(steps, index)) === FormStepStatus.FINISH) {
      this.onFinish.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: (index + 1) });
    }

    this.onChange.emit({ oldStep: oldStep, currentStep: this.getCurrent(steps), current: (index + 1) });
  }

  deactivated(newIndex: number, oldIndex: number, steps: Array<StepperConfig>) {

    for (let index in steps) {
      if (+index <= newIndex) {
        steps[index].active = true;
        continue;
      }

      if (newIndex < oldIndex) {
        steps[index].active = false;
        steps[index].disabled = true;
        continue;
      }

    }
  }

  show() {
    this._fw.visible = true;
    this.renderer();
  }

  hide() {
    this._fw.visible = false;
    this.renderer();
  }

  setNavigationBefore(templateRef: any, data: any = {}) {
    if (templateRef != null) {
      const _data = this.generateData(data);

      this._fw.navigationBefore = {
        enabled: true,
        templateRef: templateRef,
        meta: _data
      }

      this.renderer();
    }
  }

  setNavigationAfter(templateRef: any, data: any = {}) {
    if (templateRef != null) {
      const _data = this.generateData(data);

      this._fw.navigationAfter = {
        enabled: true,
        templateRef: templateRef,
        meta: _data
      }

      this.renderer();
    }
  }

  setFooterTemplate(templateRef: any, data: any = {}) {
    if (templateRef != null) {
      const _data = this.generateData(data);

      this._fw.footer = {
        enabled: true,
        templateRef: templateRef,
        meta: _data
      }

      this.renderer();
    }
  }

  destroy() {
    this.steps = [];
    this._fw = null;
    this.renderer();
    this.onDestroy.emit();
  }

  setCurrent(current: number) {
    let index = 1;
    const _steps = [...this._fw.steps.map((step: StepperConfig) => {
      const __step = { ...step };

      if (index <= current) {
        __step.active = true;
        __step.disabled = false;
      } else {
        __step.active = false;
        __step.disabled = true;
      }
      index++;
      return __step;
    })];

    this.goto(current - 1, _steps);
    this.renderer();
  }

  renderer() {
    if (!(<ViewRef>this.cdr).destroyed) {
      this.cdr.detectChanges();
    }
  }

  private formBuilder(formStep: Array<StepperConfig>): Stepper {
    return Object.assign({}, {
      currentStep: (formStep != null && formStep.length >= 1 ? formStep[0] : null),
      readonly: false,
      status: !formStep || formStep.length ? FormStepStatus.EMPTY : FormStepStatus.IN_PROGRESS,
      current: (formStep != null && formStep.length >= 1 ? 1 : null),
      steps: (formStep != null && formStep.length >= 1 ? formStep : []),
      button: {
        enabled: true,
        next: {
          label: 'ต่อไป',
          show: true
        } as ButtonStepTemplate,
        prev: {
          label: 'ย้อนกลับ',
          show: false
        } as ButtonStepTemplate,
        finish: {
          label: 'ยืนยัน',
          show: false
        } as ButtonStepTemplate,
      } as ButtonStep,
      visible: (formStep != null && formStep.length >= 1)
    } as Stepper);
  }

  private stepBuilder(steps: Array<StepperConfig>) {
    if (steps != null && isArray(steps)) {

      let index = 0;
      steps.map((step: StepperConfig) => {
        if (step && index === 0) {
          step.active = step.active || true;
          step.disabled = step.disabled || false;
        } else {
          step.active = step.active || false;
          step.disabled = step.disabled || true;
        }
        index++;
      });
    }

    return steps;
  }

  private generateData(data: any = {}): any {
    const combine = (data != null) ? { ...data, form: { ...this._fw } } : { form: { ...this._fw } };

    return combine;
  }

  private renderButton(formWizard: Stepper, index: number): ButtonStep {
    if (!formWizard) {
      return {
        enabled: false,
        prev: {
          show: false
        },
        next: {
          show: false,
        },
        finish: {
          show: false,
        }
      } as ButtonStep;
    }

    return {
      ...formWizard.button,
      prev: {
        ...formWizard.button.prev,
        show: this.hasPrev(formWizard.steps)
      },
      next: {
        ...formWizard.button.next,
        show: this.hasNext(formWizard.steps)
      },
      finish: {
        ...formWizard.button.finish,
        show: this.hasFinish(formWizard.steps, index)
      }
    } as ButtonStep;
  }

  private getCurrent(steps: Array<StepperConfig>) {
    const findActive = steps.filter((step: StepperConfig) => step.active);

    if (findActive != null && findActive.length >= 1) {
      return findActive[findActive.length - 1];
    } else {
      return steps[0];
    }
  }

  private getIndex(steps: Array<StepperConfig>) {
    const findActive = steps.filter((step: StepperConfig) => step.active);

    if (findActive != null && findActive.length >= 1) {
      return findActive.length - 1;
    } else {
      return null;
    }
  }

  private hasNext(steps: Array<StepperConfig>) {
    const findActive = steps.filter((step: StepperConfig) => step.active && !step.disabled) || [];
    return findActive != null && findActive.length <= steps.length
  }

  private hasPrev(steps: Array<StepperConfig>) {
    const findActive = steps.filter((step: StepperConfig) => step.active && !step.disabled) || [];
    return findActive != null && findActive.length > 1;
  }

  private hasFinish(steps: Array<StepperConfig>, currnetIndex: number) {
    const findActive = steps.filter((step: StepperConfig) => step.active && !step.disabled) || [];
    return findActive != null && findActive.length === steps.length && currnetIndex === (findActive.length - 1)
  }

  private mapStatus(hasFinish: boolean): FormStepStatus {
    if (hasFinish) {
      return FormStepStatus.FINISH;
    }

    if (this._fw.steps === null || !this._fw.steps || this._fw.steps.length <= 0) {
      return FormStepStatus.EMPTY;
    }

    return FormStepStatus.IN_PROGRESS;
  }

}
