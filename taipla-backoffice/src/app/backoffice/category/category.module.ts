import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from '@backoffice/category/category-routing.module';
import { CategoryComponent } from '@backoffice/category/category.component';
import { CategoryManageComponent } from '@backoffice/category/components/category-manage/category-manage.component';
import { CategoryManageListComponent } from '@backoffice/category/components/category-manage/components/category-manage-list/category-manage-list.component';
import { CategoryManageAddComponent } from '@backoffice/category/components/category-manage/components/category-manage-add/category-manage-add.component';
import { CategoryManageEditComponent } from '@backoffice/category/components/category-manage/components/category-manage-edit/category-manage-edit.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryManageComponent,
    CategoryManageListComponent,
    CategoryManageAddComponent,
    CategoryManageEditComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
