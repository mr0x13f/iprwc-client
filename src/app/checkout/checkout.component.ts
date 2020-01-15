import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

enum CheckoutError {
    NONE,
    CHECKOUT_FAIL
}

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    error = CheckoutError.NONE;
    CheckoutError: typeof CheckoutError = CheckoutError;

    constructor(
        private router:Router,
        private cartService:CartService
    ) { }

    ngOnInit() {
    }

    onCheckout() {

        this.cartService.checkout(
            () => {
                this.router.navigate(["/order-complete"]);
            }, error => {
                this.error = CheckoutError.CHECKOUT_FAIL;
            });

    }

}
