import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-order-list-item',
    templateUrl: './order-list-item.component.html',
    styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {

    @Input("order") order:Order;
    @Input("product") product:Product;

    constructor() { }

    ngOnInit() {
    }

}
