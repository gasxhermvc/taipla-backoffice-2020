import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app-base/components/login/login.component';


const ROUTES_LOGIN: Routes = [{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES_LOGIN)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
