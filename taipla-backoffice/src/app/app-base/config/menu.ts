import { MENU } from '@app/app-base/interfaces/menu-config';
import { environment } from '@environments/environment';

export let MENU_CONFIGS: MENU[] = [
    {
        NAME: 'dashboard',
        LABEL: "หน้าแรก",
        ICON: 'home',
        PATH: 'dashboard',
        IS_ACTIVE: true,
        IS_MENU: true
    },
    {
        NAME: 'um',
        LABEL: 'จัดการผู้ใช้งาน',
        ICON: 'user',
        PATH: 'um',
        IS_ACTIVE: false,
        IS_MENU: true
    },
    {
        NAME: 'category',
        LABEL: 'ประเภทอาหาร',
        ICON: 'read',
        PATH: 'category',
        IS_ACTIVE: false,
        IS_MENU: true
    },
    {
        NAME: 'food-center',
        LABEL: 'อาหารส่วนกลาง',
        ICON: 'database',
        PATH: 'food-center',
        IS_ACTIVE: false,
        IS_MENU: true
    },
    {
        NAME: 'restaurant',
        LABEL: 'ร้านอาหาร',
        ICON: 'reconciliation',
        PATH: 'restaurant',
        IS_ACTIVE: false,
        IS_MENU: true
    },
    {
        NAME: 'media',
        LABEL: 'ภาพสื่อ',
        ICON: 'cloud-upload',
        PATH: 'media',
        IS_ACTIVE: false,
        IS_MENU: true
    },
    {
        NAME: 'report',
        LABEL: 'รายงาน',
        ICON: 'export',
        PATH: 'report',
        IS_ACTIVE: false,
        IS_MENU: false
    },
    {
        NAME: 'account',
        LABEL: 'ข้อมูลส่วนตัว',
        ICON: 'profile',
        PATH: 'account',
        IS_ACTIVE: false,
        IS_MENU: false
    },
    {
        NAME: 'logout',
        LABEL: 'ออกจากระบบ',
        ICON: 'logout',
        PATH: environment.auth.redirects.logout,
        IS_ACTIVE: false,
        IS_MENU: true
    }
];