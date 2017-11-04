import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpClientService {
    constructor(
        private http: Http
    ){ }

    public get = (url: string, headers?:Headers) =>{

        //TODO: Adicionar headers
        return this.http.get(url);
    }

    public post = (url: string, data:any, headers?:Headers) =>{
        return this.http.post(url, data);
    }

    public put = (url: string, data:any, headers?:Headers) =>{
        return this.http.put(url, data);
    }

    public delete = (url: string, headers?:Headers) =>{
        return this.http.delete(url);
    }
}
