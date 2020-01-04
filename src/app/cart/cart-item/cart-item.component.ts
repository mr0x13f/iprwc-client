import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

enum CartItemError {
    NONE,
    PRODUCT_NOT_FOUND,
}

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

    error = CartItemError.NONE;
    CartItemError: typeof CartItemError = CartItemError;

    @Input("cartItem") cartItem:CartItem;
    @Output("remove") removeEvent = new EventEmitter<CartItem>();

    product:Product;

    constructor(
        private cartService:CartService,
        private productService:ProductService,
    ) {}

    ngOnInit() {

        this.productService.getProductById(this.cartItem.productId,
            product => {
                this.product = product;
            }, error => {
                this.error = CartItemError.PRODUCT_NOT_FOUND;
            })

    }

    onRemove() {
        this.removeEvent.emit(this.cartItem);
    }

}
