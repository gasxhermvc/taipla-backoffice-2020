//=>Angular
import { Injector } from '@angular/core';

//=>App
import { AppService } from '@based/services/app.service';

export class BaseRequest {
    protected app: AppService;

    constructor(injector: Injector) {
        this.app = injector.get(AppService);
    }
}