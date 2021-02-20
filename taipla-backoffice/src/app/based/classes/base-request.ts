//=>Angular
import { Injector } from '@angular/core';

//=>App
import { AppService } from '@based/services/app.service';

export class BaseRequest {
    protected _app: AppService;

    public get app(){
      return this._app;
    }

    constructor(injector: Injector) {
        this._app = injector.get(AppService);
    }
}
