import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UmRoutingModule } from '@backoffice/um/um-routing.module';
import { UmComponent } from '@backoffice/um/um.component';
import { ListsComponent } from './components/lists/lists.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [UmComponent, ListsComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    UmRoutingModule
  ]
})
export class UmModule { }
