import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    constructor(
        private toastr: ToastrService
    ){ }

    public success = (message: string, title?: string) => {
        this.toastr.success(message, title);
    }

    public error = (message: string, title?: string) => {
        this.toastr.error(message, title);
    }

    public info = (message: string, title?: string) => {
        this.toastr.info(message, title);
    }
}