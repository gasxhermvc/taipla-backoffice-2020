import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';

//=>Application
import { AppBaseModule } from '@app-base/app-base.module';
import { RestaurantRoutingModule } from '@backoffice/restaurant/restaurant-routing.module';
import { RestaurantComponent } from '@backoffice/restaurant/restaurant.component';
import { BackofficeShareModule } from '@app/backoffice/cores/backoffice-share.module';
import { ShareModule } from '@app/cores/share.module';
import { RestaurantManageComponent } from '@app/backoffice/restaurant/components/restaurant-manage/restaurant-manage.component';
import { RestaurantManageAddComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-add/restaurant-manage-add.component';
import { RestaurantManageEditComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit.component';
import { RestaurantManageListComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-list/restaurant-manage-list.component';
import { RestaurantManageEditMainComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-main/restaurant-manage-edit-main.component';
import { RestaurantManageEditMediaComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-media/restaurant-manage-edit-media.component';
import { RestaurantManageEditMenuComponent } from '@app/backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-menu/restaurant-manage-edit-menu.component';
import { RestaurantMenuModule } from '@backoffice/restaurant-menu/restaurant-menu.module';
import { RestaurantManageEditPromotionComponent } from '@backoffice/restaurant/components/restaurant-manage/components/restaurant-manage-edit/restaurant-manage-edit-promotion/restaurant-manage-edit-promotion.component';
import { PromotionModule } from '@backoffice/promotion/promotion.module';
@NgModule({
  declarations: [
    RestaurantComponent,
    RestaurantManageComponent,
    RestaurantManageAddComponent,
    RestaurantManageEditComponent,
    RestaurantManageListComponent,
    RestaurantManageEditMainComponent,
    RestaurantManageEditMediaComponent,
    RestaurantManageEditMenuComponent,
    RestaurantManageEditPromotionComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    AppBaseModule,
    ShareModule,
    BackofficeShareModule,
    RestaurantMenuModule,
    PromotionModule,

    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    NzTableModule,

  ],
  exports: [
    RestaurantComponent,
    RestaurantManageComponent,
    RestaurantManageAddComponent,
    RestaurantManageEditComponent,
    RestaurantManageListComponent,
    RestaurantManageEditMainComponent,
    RestaurantManageEditMediaComponent,
    RestaurantManageEditMenuComponent,
    RestaurantManageEditPromotionComponent
  ],
  providers: [
    NzTableStyleService
  ]
})
export class RestaurantModule { }
