import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

enum CartError {
    NONE,
    LOAD_FAIL,
    REMOVE_FAIL,
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
    CartError: typeof CartError = CartError;

    cartItems:CartItem[] = [];
    products:{[id:string]:Product} = {};
    totalPrice = 0;

    constructor(
        private authService:AuthService,
        private cartService:CartService,
        private productService:ProductService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.cartService.listCartItems(
            cartItems => {

                this.cartItems = cartItems;
                for (let cartItem of cartItems) {
                    this.productService.getProductById(cartItem.productId,
                        product => {
                            this.products[product.productId] = product;
                            this.totalPrice += product.price * cartItem.amount;
                        });
                }

            }, error => {
                this.error = CartError.LOAD_FAIL;
            });

    }

    calculateTotalPrice() {

        this.totalPrice = 0;
        for (let cartItem of this.cartItems) {
            let product = this.products[cartItem.productId];
            this.totalPrice += product.price * cartItem.amount;
        }

    }

    onChange(cartItem:CartItem) {

        this.calculateTotalPrice();
        
    }

    onRemove(cartItem:CartItem) {
        
        this.cartService.deleteCartItem(cartItem.productId,
            () => {

                for( let i = 0; i < this.cartItems.length; i++){ 
                    if ( this.cartItems[i] === cartItem) {
                        this.cartItems.splice(i, 1); 
                    }
                }

                this.calculateTotalPrice();

            }, error => {
                this.error = CartError.REMOVE_FAIL;
            });
    }

    onRemoveAll() {

        this.cartService.clearCart(
            () => {
                this.cartItems = [];
            }, error => {
                this.error = CartError.CLEAR_FAIL;
            });
        
        this.totalPrice = 0;

    }

    onCheckout() {

        this.cartService.checkout(
            () => {
                this.cartItems = [];
            }, error => {
                this.error = CartError.CHECKOUT_FAIL;
            });

        this.totalPrice = 0;

    }

}
