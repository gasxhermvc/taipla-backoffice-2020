import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UmRoutingModule } from '@backoffice/um/um-routing.module';
import { UmComponent } from '@backoffice/um/um.component';


@NgModule({
  declarations: [UmComponent],
  imports: [
    CommonModule,
    UmRoutingModule
  ]
})
export class UmModule { }
