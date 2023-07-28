import { Component,OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    template: ''
  })
export abstract class BasePageComponent implements OnInit {

    constructor(
        public toastr: ToastrService,
        public router: Router,
        ) 
    {

    }

    ngOnInit(): void {
        this.stopLoading();
    }

    protected startLoading = () => $('#loading').removeClass('not-load');
    protected stopLoading = () => $('#loading').addClass('not-load');

    public onError(fail: HttpErrorResponse) {
        console.log(fail);
        this.stopLoading();

        switch (fail.status) {
            case 404:
                this.onErro404();
                break;
            case 401:
                this.onErro401(fail);
                break;
        }
    }

    private onErro401(fail: HttpErrorResponse) {
        localStorage.clear();
        sessionStorage.clear();        
        window.location.replace('/login');
    }

    private onErro404() {
      this.toastr.warning(`Usuário ou senha inválidos`, '');
        this.stopLoading();
        return;
    }
}
