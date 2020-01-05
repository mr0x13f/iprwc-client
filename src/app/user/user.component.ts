import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

enum UserError {
    NONE,
    LOAD_FAIL,
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    error = UserError.NONE;
    UserError: typeof UserError = UserError;

    user:User;

    constructor(
        private authService:AuthService,
        private userService:UserService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.userService.getSelf(
            user => {
                this.user = user;
                this.authService.user = user;
            }, error => {
                this.error = UserError.LOAD_FAIL;
            }
        )

    }

}
