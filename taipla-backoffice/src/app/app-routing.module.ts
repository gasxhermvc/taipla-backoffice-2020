import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBaseModule } from '@app-base/app-base.module';
import { SwitcherComponent } from '@app-base/components/switcher/switcher.component';
import { AuthGuard } from '@based/guards/auth.guard';
import { environment as env } from '@environments/environment';

//example1 => /path1/ output => path1
//example2 => /path1/path2/ output => path1/path2
const root = env.auth.redirects.intent._trim('/');
console.log('root', root);
const routes: Routes = [
  {
    path: '',
    component: SwitcherComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    AppBaseModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
