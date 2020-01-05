import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WishlistItem } from 'src/app/models/wishlist-item.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-wishlist-item',
    templateUrl: './wishlist-item.component.html',
    styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {

    @Input("wishlistItem") wishlistItem:WishlistItem;
    @Input("product") product:Product;
    @Output("remove") removeEvent = new EventEmitter<WishlistItem>();

    constructor(
        private productService:ProductService
    ) {}

    ngOnInit() {

    }

    onRemove() {
        this.removeEvent.emit(this.wishlistItem);
    }

}
