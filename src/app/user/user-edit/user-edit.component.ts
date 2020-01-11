import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { RegisterForm } from 'src/app/models/register-form.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

enum UserEditError {
    NONE,
    READ_FAIL,
    UPDATE_FAIL,
    PASSWORD_MISMATCH,
}

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    error = UserEditError.NONE;
    UserEditError: typeof UserEditError = UserEditError;

    user:User;
    registerForm:RegisterForm;
    repeatPassword:string;

    constructor(
        private router:Router,
        private authService:AuthService,
        private userService:UserService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.userService.getSelf(
            user => {
                this.user = user;
                this.registerForm = new RegisterForm(
                    user.email,
                    user.name,
                    null
                );
            }, error => {
                this.error = UserEditError.READ_FAIL;
            });

    }

    onSave() {

        if (this.registerForm.password != this.repeatPassword) {
            this.error = UserEditError.PASSWORD_MISMATCH;
            return;
        }

        this.userService.update(this.registerForm,
            user => {
                this.router.navigate(["/user"]);
            }, error => {
                this.error = UserEditError.UPDATE_FAIL;
            });

    }

}
