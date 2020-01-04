import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    user:User;

    constructor(
        private authService:AuthService
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.user = this.authService.user;

    }

}
