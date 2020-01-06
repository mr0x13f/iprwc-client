import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

enum OrderError {
    NONE,
    LOAD_FAIL
}

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    error = OrderError.NONE;
    OrderError: typeof OrderError = OrderError;

    orders:Order[] = [];
    products:{[id:string]:Product} = {};

    constructor(
        private authService:AuthService,
        private orderService:OrderService,
        private productService:ProductService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.orderService.listOrders(
            orders => {

                this.orders = orders;
                for (let order of orders) {
                    this.productService.getProductById(order.productId,
                        product => {
                            this.products[product.productId] = product;
                        });
                }

            }, error => {
                this.error = OrderError.LOAD_FAIL;
            });

    }

}
