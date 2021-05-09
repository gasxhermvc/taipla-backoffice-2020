import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTabsModule } from 'ng-zorro-antd/tabs';

//=>Application
import { RestaurantMenuRoutingModule } from '@backoffice/restaurant-menu/restaurant-menu-routing.module';
import { RestaurantMenuComponent } from '@backoffice/restaurant-menu/restaurant-menu.component';
import { RestaurantMenuManageComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/restaurant-menu-manage.component';
import { RestaurantMenuManageListComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-list/restaurant-menu-manage-list.component';
import { RestaurantMenuManageAddComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-add/restaurant-menu-manage-add.component';
import { RestaurantMenuManageEditComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-edit/restaurant-menu-manage-edit.component';
import { ShareModule } from '@cores/share.module';
import { BackofficeShareModule } from '@backoffice/cores/backoffice-share.module';
import { RestaurantMenuManageEditMainComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-edit/restaurant-menu-manage-edit-main/restaurant-menu-manage-edit-main.component';
import { RestaurantMenuManageEditMediaComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-edit/restaurant-menu-manage-edit-media/restaurant-menu-manage-edit-media.component';
import { RestaurantMenuManageEditLegendComponent } from '@backoffice/restaurant-menu/components/restaurant-menu-manage/components/restaurant-menu-manage-edit/restaurant-menu-manage-edit-legend/restaurant-menu-manage-edit-legend.component';
import { LegendModule } from '@cores/legend/legend.module';
import { AppBaseModule } from '@app-base/app-base.module';



@NgModule({
  declarations: [
    RestaurantMenuComponent,
    RestaurantMenuManageComponent,
    RestaurantMenuManageListComponent,
    RestaurantMenuManageAddComponent,
    RestaurantMenuManageEditComponent,
    RestaurantMenuManageEditMainComponent,
    RestaurantMenuManageEditMediaComponent,
    RestaurantMenuManageEditLegendComponent
  ],
  imports: [
    CommonModule,
    RestaurantMenuRoutingModule,
    AppBaseModule,
    ShareModule,
    BackofficeShareModule,
    LegendModule,

    NzButtonModule,
    NzIconModule,
    NzTabsModule
  ],
  exports: [
    RestaurantMenuComponent,
    RestaurantMenuManageComponent,
    RestaurantMenuManageListComponent,
    RestaurantMenuManageAddComponent,
    RestaurantMenuManageEditComponent,
    RestaurantMenuManageEditMainComponent,
    RestaurantMenuManageEditMediaComponent,
    RestaurantMenuManageEditLegendComponent
  ]
})
export class RestaurantMenuModule { }
