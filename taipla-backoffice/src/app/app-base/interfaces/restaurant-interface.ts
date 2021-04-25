export interface Restaurant {
    RES_ID?: number;
    COUNTRY_ID?: number;
    COUNTRY_NAME_TH?: string;
    NAME_TH?: string;
    ADDRESS?: string;
    PROVINCE?: string;
    AMPHOE?: string;
    MAP?: string;
    LATITUDE?: number;
    LONGITUDE?: number;
    WEBSITE?: string;
    FACEBOOK?: string;
    LINE?: string;
    OPEN_TIME?: string;
    PHONE?: string;
    TAGS?: string;
    CAR_PARK?: boolean;
    AUTHOR?: string;

    VIEWER?:number;

    CREATED_DATE?: string;
    UPDATED_DATE?: string;
    UPLOAD_FILES?: any;
  
    //=>Legend
    LEGENDS?: any;
}