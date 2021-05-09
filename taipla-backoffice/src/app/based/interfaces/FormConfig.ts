import { NzUploadFile } from "ng-zorro-antd/upload";

/* Form config */
export interface FormConfig {
    ngClass?: any;
    label?: string;
    key?: string;
    type?: ControlType;
    errorMessages?: ValidatorMessage;
    inline?: boolean;
    multiple?: boolean;
    preview?: boolean;
    limit?: any;
    allowFileType?: string;
    size?: Number;
    avatarUrl?: string;
    listType?: 'text' | 'picture' | 'picture-card';
    fileList?: NzUploadFile[];

    placeholder?: any;
    defaultValue?: any;
    lookup?: any[];
    lookupKey?: string;
    lookupLabel?: string;
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


    //=>legend
    useDefault?: boolean;
    legendValues?: any;
    defaultType?: any;

    coordinate?: CoordinateConfig;
}

export interface ValidatorMessage {
    required?: string;
    regex?: string;
    email?: string;
    phone?: string;
    uploadFormat?: string;
    uploadSize?: string;
    uploadLimit?: string;
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
    slider,
    coordinates,
    legend,
    tags,
    tagTokenize
}

export interface CoordinateConfig {
    LAT: string;
    LONG: string;
    defaultValue?: CoordinateValue;
    coordinateValidate?: boolean;
    coordinateThaiValidate?: boolean;
    decimalPlaces?: number;
    change?: any;
    blur?: any;
}

export interface CoordinateValue {
    LAT?: number;
    LONG?: number;
}


export enum ERROR_TYPE_TEXT {
    'required' = 'required',
    'regex' = 'regex',
    'email' = 'email',
    'uploadFormat' = 'uploadFormat',
    'uploadSize' = 'uploadSize',
    'uploadLimit' = 'uploadLimit',
    'phone' = 'phone',
    'minlength' = 'minLength',
    'maxlength' = 'maxLength',
    'date' = 'date'
}
