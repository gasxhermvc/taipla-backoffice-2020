import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTabsModule } from 'ng-zorro-antd/tabs';

//=>Application
import { PromotionRoutingModule } from '@backoffice/promotion/promotion-routing.module';
import { PromotionComponent } from '@backoffice/promotion/promotion.component';
import { PromotionManageComponent } from '@backoffice/promotion/components/promotion-manage/promotion-manage.component';
import { PromotionManageListComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-list/promotion-manage-list.component';
import { PromotionManageAddComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-add/promotion-manage-add.component';
import { PromotionManageEditComponent } from '@backoffice/promotion/components/promotion-manage/components/promotion-manage-edit/promotion-manage-edit.component';
import { ShareModule } from '@cores/share.module';
import { BackofficeShareModule } from '@backoffice/cores/backoffice-share.module';
import { LegendModule } from '@cores/legend/legend.module';
import { AppBaseModule } from '@app-base/app-base.module';



@NgModule({
  declarations: [
    PromotionComponent,
    PromotionManageComponent,
    PromotionManageListComponent,
    PromotionManageAddComponent,
    PromotionManageEditComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    AppBaseModule,
    ShareModule,
    BackofficeShareModule,
    LegendModule,

    NzButtonModule,
    NzIconModule,
    NzTabsModule
  ],
  exports: [
    PromotionComponent,
    PromotionManageComponent,
    PromotionManageListComponent,
    PromotionManageAddComponent,
    PromotionManageEditComponent
  ]
})
export class PromotionModule { }
