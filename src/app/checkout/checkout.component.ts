import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

    triedToEnterAddress = false;

    constructor(
        private router:Router,
        private authService:AuthService,
        private cartService:CartService
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

    }

    onCheckout() {

        this.cartService.checkout(
            () => {
                this.router.navigate(["/order-complete"]);
            }, error => {
                this.error = CheckoutError.CHECKOUT_FAIL;
            });

    }

    onClickAddress() {
        this.triedToEnterAddress = true;
    }

}
