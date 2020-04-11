import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from '@backoffice/media/media-routing.module';
import { MediaComponent } from '@backoffice/media/media.component';


@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    MediaRoutingModule
  ]
})
export class MediaModule { }
