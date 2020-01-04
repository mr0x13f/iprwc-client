import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    error = false;

    constructor(private router:Router, private authService:AuthService) { }

    ngOnInit() {

        if (this.authService.isLoggedIn()) this.router.navigate(["/"]);

    }

    onSubmit(form:NgForm) {

        let loginForm = <{email:string, password:string}> form.value;

        this.authService.login(loginForm.email, loginForm.password,
            error => {
                // error
                this.error = true;
            },
            () => {
                // success
                console.log(this.authService.user);
                this.router.navigate(["/"]);
            })
    }

}
