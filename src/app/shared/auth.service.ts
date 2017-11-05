import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { tokenNotExpired }  from 'angular2-jwt';

@Injectable()
export class AuthService {
    public authToken;
    public email;
    private options;

    constructor(
        private toastr: ToastrService,
        private httpClient:HttpClientService
    ){ }

    public storeUserData = (token:string, email:any)=>{
        this.authToken = token;
        this.email = email;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }

    public createAuthenticationHeaders = () => {
        if(!this.authToken){
            this.authToken = localStorage.getItem('token');
        }
        this.options = new RequestOptions({
            headers: new Headers({
                'authorization': this.authToken
            })
        })

        return this.options;
    }
    public logout = () => {
        localStorage.clear();
        this.authToken = '';
        this.email  = '';
        this.options  = '';
    }
    public loggedIn = () =>{
        return tokenNotExpired();
    }
}