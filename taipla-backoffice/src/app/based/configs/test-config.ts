//=>Angular
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

//=>Libraries
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

//=>App

export const moduleConfig: any = [
    RouterTestingModule,
    HttpClientTestingModule,
    InfiniteScrollModule
];