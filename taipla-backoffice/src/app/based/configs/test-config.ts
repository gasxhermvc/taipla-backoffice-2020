//=>Angular
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

//=>Libraries
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App

export const moduleConfig: any = [
    NgZorroAntdModule,
    RouterTestingModule,
    HttpClientTestingModule,
    InfiniteScrollModule
];