import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-order-complete',
    templateUrl: './order-complete.component.html',
    styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

    constructor(
        private authService:AuthService
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

    }

}
