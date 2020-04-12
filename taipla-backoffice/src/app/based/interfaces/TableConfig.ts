/* Table config */
export interface TableConfig {
    displayOrder?: boolean;
    displayAction?: boolean;
}

/* Column config */
export interface ColumnConfig {
    key: string;
    label?: string;
    action?: boolean;
}
