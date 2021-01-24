//=>Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//=>Libraries
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

//=>App
import { LayoutTemplateComponent } from '@app/app-base/components/layout-template/layout-template.component';
import { LayoutTemplateService } from '@app/app-base/components/layout-template/layout-template.service';



@NgModule({
  declarations: [
    LayoutTemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  exports: [
    LayoutTemplateComponent
  ],
  entryComponents: [
    LayoutTemplateComponent
  ],
  providers: [
    LayoutTemplateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutTemplateModule { }
