import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from "rxjs/operators";
import { User } from '../models/user.model';
import { RegisterForm } from '../models/register-form.model';

@Injectable({providedIn: 'root'})

export class UserService {

    public user: User|null = null;

    constructor(private httpService:HttpService) {}

    public getSelf(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("user")
            .pipe( map( response => {
                return <User> response;
            }))
            .subscribe(next, error, complete)

    }

    public register(registerForm:RegisterForm, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.post("user/register", registerForm)
            .pipe( map( response => {
                return <User> response;
            }))
            .subscribe(next, error, complete)

    }

    public update(registerForm:RegisterForm, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.put("user", registerForm)
            .pipe( map( response => {
                return <User> response;
            }))
            .subscribe(next, error, complete)

    }

    public delete(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.delete("user")
            .pipe( map( response => {
                return <User> response;
            }))
            .subscribe(next, error, complete)

    }

    public login(email:string, password:string): void {

        this.httpService.headers = this.httpService.headers.append("Authorization", "Basic "+btoa(email+":"+password));

        this.getSelf( user => {
                this.user = user;
            }, error => {
                this.user = null;
                this.httpService.headers = this.httpService.headers.delete("Authorization");
            })

    }

    public logout(): void {

        this.user = null;
        this.httpService.headers = this.httpService.headers.delete("Authorization");

    }

    public isLoggedIn(): boolean {
        return this.user instanceof User;
    }

    public isAdmin(): boolean {
        return this.user instanceof User && this.user.isAdmin;
    }

}