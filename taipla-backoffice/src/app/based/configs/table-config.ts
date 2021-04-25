import { TestRequest } from "@angular/common/http/testing";

export const UM_LIST_CONFIG: any = [
    {
        HEADER: '',
        KEY: 'EXPAND',
        HIDE: 'mobile tablet',
        CLASS: 'text-center align-top EXPAND',
        WIDTH: '60px',
    },
    {
        HEADER: '#',
        KEY: 'ROWNO',
        HIDE: undefined,
        CLASS: 'text-center align-top ROWNO',
        WIDTH: '80px',

    },
    {
        HEADER: 'รูปประจำตัว',
        KEY: 'AVATAR',
        HIDE: undefined,
        CLASS: 'text-center align-top AVATAR',
        WIDTH: '120px'
    },
    {
        HEADER: 'ชื่อผู้ใช้งาน',
        KEY: 'USERNAME',
        HIDE: undefined,
        CLASS: 'text-center align-top USERNAME',
        WIDTH: '120px'
    },
    {
        HEADER: 'ชื่อ - นามสกุล',
        KEY: 'FULL_NAME',
        CLASS: 'text-center align-top FULL_NAME',
        WIDTH: '180px'
    },
    {
        HEADER: 'สถานะ',
        KEY: 'ROLE',
        HIDE: 'mobile tablet',
        CLASS: 'text-center align-top ROLE',
        RESPONSIVE: true,
        WIDTH: '100px'
    },
    {
        HEADER: 'วันที่สร้าง',
        KEY: 'CREATE_DATE',
        HIDE: 'mobile tablet',
        CLASS: 'text-center align-top CREATE_DATE',
        WIDTH: '120px'
    },
    {
        HEADER: 'วันที่แก้ไข',
        KEY: 'UPDATE_DATE',
        HIDE: 'mobile tablet',
        CLASS: 'text-center align-top UPDATE_DATE',
        RESPONSIVE: true,
        WIDTH: '120px'
    },
    {
        HEADER: 'จัดการ',
        KEY: 'MANAGE',
        HIDE: 'mobile tablet',
        CLASS: 'text-center align-top MANAGE',
        WIDTH: '200px',
        RESPONSIVE: true,
        ACTION: true
    }
]