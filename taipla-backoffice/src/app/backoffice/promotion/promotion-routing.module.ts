import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from '@app/backoffice/promotion/promotion.component';
import { PromotionManageComponent } from '@app/backoffice/promotion/components/promotion-manage/promotion-manage.component';

const PROMOTION_ROUTES: Routes = [
  {
    path: '',
    component: PromotionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: PromotionManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROMOTION_ROUTES)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
