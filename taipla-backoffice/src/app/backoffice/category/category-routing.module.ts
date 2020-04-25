import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '@backoffice/category/category.component';
import { CategoryManageComponent } from '@backoffice/category/components/category-manage/category-manage.component';


const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: CategoryManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CATEGORY_ROUTES)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
