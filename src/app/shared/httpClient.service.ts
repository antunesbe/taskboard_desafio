import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class HttpClientService {
    private header;
    constructor(
        private http: Http
    ){ 
    }

    public get = (url: string, headers?:any) =>{
        //TODO: Adicionar headers
        return this.http.get(url, headers);
    }

    public post = (url: string, data:any, headers?:any) =>{
        return this.http.post(url, headers);
    }

    public put = (url: string, data:any, headers?:any) =>{
        return this.http.put(url, headers);
    }

    public delete = (url: string, headers?:any) =>{
        return this.http.delete(url, headers);
    }
}
