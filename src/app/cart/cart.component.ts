import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';

enum CartError {
    NONE,
    LOAD_FAIL,
    CLEAR_FAIL,
    CHECKOUT_FAIL
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    error = CartError.NONE;
    CartError : typeof CartError = CartError;

    cartItems:CartItem[] = [];

    constructor(private authService:AuthService, private cartService:CartService) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.cartService.listCartItems(
            cartItems => {
                this.cartItems = cartItems;
            }, error => {
                this.error = CartError.LOAD_FAIL;
            });

    }

    onCheckout() {

        this.cartService.checkout(
            () => {
                this.cartItems = [];
            }, error => {
                this.error = CartError.CHECKOUT_FAIL;
            });

    }

    onClearAll() {

        this.cartService.clearCart(
            () => {
                this.cartItems = [];
            }, error => {
                this.error = CartError.CLEAR_FAIL;
            });

    }

}
