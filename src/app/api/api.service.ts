import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable()
export class ApiService{
    http: HttpClient;

    constructor(_http:HttpClient){
        this.http = _http;
    }

    public get(url:string):Observable<any>{
        return this.http.get(url).pipe(map(response => response));
    }
}