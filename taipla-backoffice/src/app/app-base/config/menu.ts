import { MENU } from '@app/app-base/interfaces/menu-config';
import { environment } from '@environments/environment';

export let MENU_CONFIGS: MENU[] = [
  {
    NAME: 'dashboard',
    LABEL: "หน้าแรก",
    ICON: 'home',
    PATH: 'backoffice/dashboard',
    IS_ACTIVE: true,
    IS_MENU: true
  },
  {
    NAME: 'um',
    LABEL: 'จัดการผู้ใช้งาน',
    ICON: 'user',
    PATH: 'backoffice/um',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'country',
    LABEL: 'ประเทศ',
    ICON: 'flag',
    PATH: 'backoffice/country',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'culture',
    LABEL: 'วัฒนธรรมอาหาร',
    ICON: 'read',
    PATH: 'backoffice/culture',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'food_center',
    LABEL: 'อาหารส่วนกลาง',
    ICON: 'database',
    PATH: 'backoffice/food-center',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'restaurant',
    LABEL: 'ร้านอาหาร',
    ICON: 'reconciliation',
    PATH: 'backoffice/restaurant',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'media',
    LABEL: 'ภาพสื่อ',
    ICON: 'cloud-upload',
    PATH: 'backoffice/media',
    IS_ACTIVE: false,
    IS_MENU: true
  },
  {
    NAME: 'report',
    LABEL: 'รายงาน',
    ICON: 'export',
    PATH: 'backoffice/report',
    IS_ACTIVE: false,
    IS_MENU: false
  },
  {
    NAME: 'account',
    LABEL: 'ข้อมูลส่วนตัว',
    ICON: 'profile',
    PATH: 'backoffice/account',
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
