import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UmComponent } from '@backoffice/um/um.component';
import { ListsComponent } from '@backoffice/um/components/lists/lists.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: UmComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lists'
      },
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'edit/:user_id',
        component: EditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UmRoutingModule { }
