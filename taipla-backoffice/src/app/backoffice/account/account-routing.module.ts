import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from '@backoffice/account/account.component';


const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ACCOUNT_ROUTES)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
