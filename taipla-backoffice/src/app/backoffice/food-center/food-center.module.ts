import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCenterRoutingModule } from '@backoffice/food-center/food-center-routing.module';
import { FoodCenterComponent } from '@backoffice/food-center/food-center.component';
import { FoodCenterManageComponent } from './components/food-center-manage/food-center-manage.component';
import { FoodCenterManageAddComponent } from './components/food-center-manage/components/food-center-manage-add/food-center-manage-add.component';
import { FoodCenterManageEditComponent } from './components/food-center-manage/components/food-center-manage-edit/food-center-manage-edit.component';
import { FoodCenterManageListComponent } from './components/food-center-manage/components/food-center-manage-list/food-center-manage-list.component';;


@NgModule({
  declarations: [FoodCenterComponent, FoodCenterManageComponent, FoodCenterManageAddComponent, FoodCenterManageEditComponent, FoodCenterManageListComponent],
  imports: [
    CommonModule,
    FoodCenterRoutingModule
  ]
})
export class FoodCenterModule { }
