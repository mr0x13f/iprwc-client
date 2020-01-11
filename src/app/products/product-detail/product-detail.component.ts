import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WishlistItem } from 'src/app/models/wishlist-item.model';

enum ProductDetailError {
    NONE,
    NOT_FOUND,
    ADD_TO_CART_FAIL,
    ADD_TO_WISHLIST_FAIL
}

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    error = ProductDetailError.NONE;
    ProductDetailError: typeof ProductDetailError = ProductDetailError;

    product: Product;
    productNotFound = false;
    inCart = false;
    onWishlist = false;

    constructor(
        private route:ActivatedRoute,
        private authService:AuthService,
        private productService:ProductService,
        private cartService:CartService,
        private wishlistService:WishlistService,
    ) {}

    ngOnInit() {

        let productId = this.route.snapshot.params["id"];

        this.productService.getProductById( productId, product => {

            this.product = product;

            if (this.authService.isLoggedIn()) {

                // Check if product is in cart
                this.cartService.getCartItemById(product.productId,
                    cartItem => {
                        this.inCart = true;
                    }, error => {
                        this.inCart = false;
                    })

                // Check if product is on wishlist
                this.wishlistService.getWishlistItemById(product.productId,
                    wishlistItem => {
                        this.onWishlist = true;
                    }, error => {
                        this.onWishlist = false;
                    })
    

            }

        }, error => {
            this.error = ProductDetailError.NOT_FOUND;
        });

    }

    onAddToCart() {

        if (this.authService.requireLogin()) return;

        let cartItem = new CartItem(null, this.product.productId, 1);
        this.cartService.addToCart(cartItem,
            () => {
                this.inCart = true;
            }, error => {
                this.error = ProductDetailError.ADD_TO_CART_FAIL;
            });

    }

    onAddToWishlist() {

        if (this.authService.requireLogin()) return;

        let wishlistItem = new WishlistItem(null, this.product.productId);
        this.wishlistService.addToWishlist(wishlistItem,
            () => {
                this.onWishlist = true;
            }, error => {
                this.error = ProductDetailError.ADD_TO_WISHLIST_FAIL;
            });

    }

}
