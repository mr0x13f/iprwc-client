import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WishlistItem } from '../models/wishlist-item.model';
import { WishlistService } from '../services/wishlist.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { DialogueService } from '../services/dialogue.service';

enum WishlistError {
    NONE,
    LOAD_FAIL,
    REMOVE_FAIL,
    CLEAR_FAIL,
}


@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    error = WishlistError.NONE;
    WishlistError: typeof WishlistError = WishlistError;

    wishlistItems:WishlistItem[] = [];
    products:{[id:string]:Product} = {};

    constructor(
        private authService:AuthService,
        private wishlistService:WishlistService,
        private productService:ProductService,
        private dialogueService:DialogueService
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.wishlistService.listWishlistItems(
            wishlistItems => {

                this.wishlistItems = wishlistItems;
                for (let wishlistItem of wishlistItems) {
                    if (this.products[wishlistItem.productId] == null) {
                        this.productService.getProductById(wishlistItem.productId,
                            product => {
                                if (this.products[wishlistItem.productId] == null) {
                                    this.products[product.productId] = product;
                                }
                            });
                    }
                }

            }, error => {
                this.error = WishlistError.LOAD_FAIL;
            });


    }

    onRemove(wishlistItem:WishlistItem) {
        
        this.wishlistService.deleteWishlistItem(wishlistItem.productId,
            () => {

                for( let i = 0; i < this.wishlistItems.length; i++){ 
                    if ( this.wishlistItems[i] === wishlistItem) {
                        this.wishlistItems.splice(i, 1); 
                    }
                }

            }, error => {
                this.error = WishlistError.REMOVE_FAIL;
            });
    }

    onRemoveAll() {

        this.dialogueService.showMessage("Are you sure you want to clear your wishlist?",
            "Clear", () => {

                this.wishlistService.clearWishlist(
                    () => {
                        this.wishlistItems = [];
                    }, error => {
                        this.error = WishlistError.CLEAR_FAIL;
                    });

            }, "Cancel")

    }

}
