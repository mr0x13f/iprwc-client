import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

    @Input("cartItem") cartItem:CartItem;
    @Input("product") product:Product;
    @Output("remove") removeEvent = new EventEmitter<CartItem>();
    @Output("amountChange") amountChangeEvent = new EventEmitter<CartItem>();
    
    constructor() {}

    ngOnInit() {

    }

    onRemove() {
        this.removeEvent.emit(this.cartItem);
    }

    onChange(event:Event) {

        let input:HTMLInputElement = <HTMLInputElement> event.target;
        input.value = Math.max(+input.value, 1).toString();
        this.cartItem.amount = +input.value;

        this.amountChangeEvent.emit(this.cartItem);

    }

}
