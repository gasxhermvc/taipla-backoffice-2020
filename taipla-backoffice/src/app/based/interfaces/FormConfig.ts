/* Form config */
export interface FormConfig {
    ngClass?: any;
    label?: string;
    key: string;
    type?: ControlType;
    errorMessages?: ValidatorMessage;
    inline?: boolean;
    multiple?: boolean;
    allowFileType?: string;
    size?: Number;
    avatarUrl?: string;

    placeholder?: any;
    defaultValue?: any;
    lookup?: any[];
    format?: string;
    change?: any;
    blur?: any;
    delay?: number;

    invisible?: boolean;
    disable?: boolean;
    autocomplete?: boolean;
    readonly?: boolean;
    view?: boolean; /* only for app-form!! */

    regex?: RegExp;
    required?: boolean;

    errortext?: string;

    min?: number;
    max?: number;
    child?: any;
    unit?: string;
    step?: number;
}

export interface ValidatorMessage {
    required?: string;
    regex?: string;
    email?: string;
    phone?: string;
    uploadFormat?: string;
    uploadSize?: string;
    minLength?: string;
    maxLength?: string;
    date?: string;
}

export enum ControlType {
    text,
    password,
    number,
    phone,
    upload,
    textarea,
    select,
    autocomplete,
    checkbox,
    radio,
    date,
    daterange,
    modal,
    slider
}

export enum ERROR_TYPE_TEXT {
    'required' = 'required',
    'regex' = 'regex',
    'email' = 'email',
    'uploadFormat' = 'uploadFormat',
    'uploadSize' = 'uploadSize',
    'phone' = 'phone',
    'minlength' = 'minLength',
    'maxlength' = 'maxLength',
    'date' = 'date'
}