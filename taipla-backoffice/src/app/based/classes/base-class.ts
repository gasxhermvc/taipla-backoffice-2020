//=>Angular
import { Injector, ViewChild } from '@angular/core';

//=>App
import { BaseRequest } from '@based/classes/base-request';
import { FormComponent } from '@app/cores/form/form.component';
import { BackofficeService } from '@app/backoffice/services/backoffice.service';


export class BaseClass extends BaseRequest {

    @ViewChild(FormComponent, { static: false }) form?: FormComponent;


    protected backoffice: BackofficeService;

    constructor(injector: Injector) {
        super(injector);

        this.backoffice = injector.get(BackofficeService);
    }

    /* Loading */
    showLoading() {
        setTimeout(() => {
            this.backoffice.loading = true;
        }, 0);
    }

    hideLoading() {
        setTimeout(() => {
            this.backoffice.loading = false;
        }, 0);
    }

}