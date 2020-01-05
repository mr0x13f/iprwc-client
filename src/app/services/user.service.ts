import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { RegisterForm } from '../models/register-form.model';

@Injectable({providedIn: 'root'})

export class UserService {

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
            .subscribe(next, error, complete)

    }

}