import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    constructor(
        private authService:AuthService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

    }

}
