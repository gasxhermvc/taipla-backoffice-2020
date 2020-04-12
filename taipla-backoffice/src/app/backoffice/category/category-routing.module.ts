import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '@backoffice/category/category.component';


const CATEGORY_ROUTES: Routes = [
  {
    path: '',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(CATEGORY_ROUTES)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
