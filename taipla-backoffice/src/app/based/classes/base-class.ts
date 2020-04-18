//=>Angular
import { Injector, ViewChild } from '@angular/core';

//=>App
import { BaseRequest } from '@based/classes/base-request';
import { FormComponent } from '@cores/form/form.component';
import { BackofficeService } from '@app/backoffice/services/backoffice.service';
import { LayoutTemplateService } from '@app-base/components/layout-template/layout-template.service';


export class BaseClass extends BaseRequest {

    @ViewChild(FormComponent, { static: false }) form?: FormComponent;

    protected layout: LayoutTemplateService;
    protected backoffice: BackofficeService;

    get store(): any {
        return this.backoffice !== undefined ? this.backoffice.service : {};
    }
    
    constructor(injector: Injector) {
        super(injector);
        this.backoffice = injector.get(BackofficeService);
        this.layout = injector.get(LayoutTemplateService);
    }

    /* Loading */
    get isShowLoading() {
        return this.backoffice.loading;
    }

    showLoading() {
        setTimeout(() => {
            console.log('backoffice.loading.show');
            this.backoffice.loading = true;
        }, 0);
    }

    hideLoading() {
        setTimeout(() => {
            console.log('backoffice.loading.hide');
            this.backoffice.loading = false;
        }, 0);
    }

}