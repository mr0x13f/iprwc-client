import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class HttpService {

    public baseUrl: string = "http://localhost:8080/";
    public headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
    });

    constructor(private http:HttpClient) {}

    public get(url:string) {
        return this.http.get(this.baseUrl + url, {headers:this.headers});
    }

    public post(url:string, body:any) {
        return this.http.post(this.baseUrl + url, body, {headers:this.headers});
    }

    public put(url:string, body:any) {
        return this.http.put(this.baseUrl + url, body, {headers:this.headers});
    }

    public delete(url:string) {
        return this.http.delete(this.baseUrl + url, {headers:this.headers});
    }

}