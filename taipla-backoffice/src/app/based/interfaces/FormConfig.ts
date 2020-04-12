/* Form config */
export interface FormConfig {
    ngClass?: any;
    label?: string;
    key: string;
    type?: ControlType;

    placeholder?: any;
    defaultValue?: any;
    lookup?: any[];
    format?: string;
    change?: any;
    blur?: any;

    invisible?: boolean;
    disable?: boolean;
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

export enum ControlType {
    text,
    number,
    textarea,
    select,
    autocomplete,
    radio,
    date,
    daterange,
    drawpoint,
    drawline,
    modal,
    buffer
}