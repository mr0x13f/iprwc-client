import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../models/register-form.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

enum RegisterError {
    NONE,
    REGISTER_FAIL,
    PASSWORD_MISMATCH,
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    error = RegisterError.NONE;
    RegisterError: typeof RegisterError = RegisterError;

    registerForm:RegisterForm = new RegisterForm("","","");
    repeatPassword:string;

    constructor(
        private router:Router,
        private userService:UserService,
    ) { }

    ngOnInit() {
    }

    onRegister() {

        if (this.registerForm.password != this.repeatPassword) {
            this.error = RegisterError.PASSWORD_MISMATCH;
            return;
        }

        this.userService.register(this.registerForm,
            () => {
                this.router.navigate(["/login"]);
            }, error => {
                this.error = RegisterError.REGISTER_FAIL;
            })

    }

}
