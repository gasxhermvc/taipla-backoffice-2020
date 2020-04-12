import { TemplateRef } from '@angular/core';
import { StepperConfig } from '@app/based/interfaces/StepperConfig';

export enum FormStepStatus {
    EMPTY = 0,
    IN_PROGRESS = 1,
    FINISH = 2,
    DESTROY = 3
}

export interface FormWizardTemplate {
    enabled: boolean;
    templateRef?: TemplateRef<any>;
    meta?: any;
}

export interface ButtonStepTemplate {
    label: string;
    show: boolean;
}

export interface ButtonStep {
    enabled: boolean;
    next?: ButtonStepTemplate;
    prev?: ButtonStepTemplate;
    finish?: ButtonStepTemplate;
}

export interface Stepper {
    steps: Array<StepperConfig>;
    currentStep: StepperConfig;
    status: FormStepStatus;
    current: number;
    clickStep: boolean;
    visible: boolean;
    readonly: boolean;
    button?: ButtonStep;
    navigationAfter?: FormWizardTemplate;
    navigationBefore?: FormWizardTemplate;
    footer?: FormWizardTemplate;
}