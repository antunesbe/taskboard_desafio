import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { tokenNotExpired }  from 'angular2-jwt';

@Injectable()
export class AuthService {
    public authToken;
    private email;
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

    public getLoggedEmail = () => {
        let loggedEmail = (this.email)?this.email:localStorage.getItem('email');
        console.log(loggedEmail);
        return loggedEmail;
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