import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class HttpService {

    public baseUrl: string = "http://localhost:8080/";
    public headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
    });
    public user: User|null = null;

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

    public login(email:string, password:string): void {

        this.headers = this.headers.append("Authorization", "Basic "+btoa(email+":"+password));

        // this.get("user", null, response => {

        //     this.user = <User> response;

        // }, error => {

        //     this.user = null;
        //     this.headers = this.headers.delete("Authorization");

        // })


    }

    public logout(): void {

        this.user = null;
        this.headers = this.headers.delete("Authorization");

    }


}