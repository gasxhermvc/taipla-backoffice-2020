import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//=>Libraries
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon'

import { AppBaseModule } from '@app-base/app-base.module';
import { FoodCenterRoutingModule } from '@app/backoffice/food-center/food-center-routing.module';
import { FoodCenterComponent } from '@app/backoffice/food-center/food-center.component';
import { FoodCenterManageComponent } from '@app/backoffice/food-center/components/food-center-manage/food-center-manage.component';
import { FoodCenterManageAddComponent } from '@app/backoffice/food-center/components/food-center-manage/components/food-center-manage-add/food-center-manage-add.component';
import { FoodCenterManageEditComponent } from '@app/backoffice/food-center/components/food-center-manage/components/food-center-manage-edit/food-center-manage-edit.component';
import { FoodCenterManageListComponent } from '@app/backoffice/food-center/components/food-center-manage/components/food-center-manage-list/food-center-manage-list.component'; import { ShareModule } from '@app/cores/share.module';
import { BackofficeShareModule } from '@app/backoffice/cores/backoffice-share.module';



@NgModule({
  declarations: [
    FoodCenterComponent,
    FoodCenterManageComponent,
    FoodCenterManageAddComponent,
    FoodCenterManageEditComponent,
    FoodCenterManageListComponent
  ],
  imports: [
    CommonModule,
    FoodCenterRoutingModule,
    AppBaseModule,
    ShareModule,
    BackofficeShareModule,

    NzButtonModule,
    NzIconModule
  ],
  exports: [
    FoodCenterComponent,
    FoodCenterManageComponent,
    FoodCenterManageAddComponent,
    FoodCenterManageEditComponent,
    FoodCenterManageListComponent
  ]
})
export class FoodCenterModule { }
