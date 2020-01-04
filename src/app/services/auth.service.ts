import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthService {

    public user:User;
    public token:Token;

    constructor(private router:Router, private httpService:HttpService, private userService:UserService) {}

    public login(email:string, password:string, success?:()=>void, error?:(error:any)=>void): void {

        this.httpService.headers = this.httpService.headers.set("Authorization", "Basic "+btoa(email+":"+password));

        this.getToken( token => {

            this.httpService.headers = this.httpService.headers.set("Authorization", "Bearer "+token);

            this.userService.getSelf( user => {

                this.token = token;
                this.user = user;

            }, err => {

                this.clearAuth();
                if (error) error(err);

            }, success )

        }, err => {

            this.clearAuth();
            if (error) error(err);

        } );

    }

    public clearAuth() {

        this.user = null;
        this.token = null;
        this.httpService.headers = this.httpService.headers.delete("Authorization");

    }

    public logout(): void {

        this.clearAuth();

    }

    public isLoggedIn(): boolean {
        return this.user != null;
    }

    public isAdmin(): boolean {
        return this.user != null && this.user.isAdmin;
    }

    public getToken(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("user/token")
            .pipe( map( response => {
                let loginResponse = <{token:string}> response;
                return loginResponse.token;
            }))
            .subscribe(next, error, complete)

    }

    public requireLogin() {

        if (!this.isLoggedIn()) this.router.navigate(["login"]);
        return !this.isLoggedIn();

    }

}