import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UmComponent } from '@backoffice/um/um.component';


const routes: Routes = [
  {
    path: '',
    component: UmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UmRoutingModule { }
