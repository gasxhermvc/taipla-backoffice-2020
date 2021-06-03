import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from '@backoffice/media/media.component';
import { MediaManageComponent } from '@backoffice/media/components/media-manage/media-manage.component';


const MEDIA_ROUTES: Routes = [
  {
    path: '',
    component: MediaComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage'
      },
      {
        path: 'manage',
        component: MediaManageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MEDIA_ROUTES)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
