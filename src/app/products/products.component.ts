import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

enum ProductsError {
    NONE,
    LOAD_FAIL
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    error = ProductsError.NONE;
    ProductsError: typeof ProductsError = ProductsError;

    products: Product[] = [];

    constructor(
        private productService:ProductService
    ) { }

    ngOnInit() {

        this.productService.listProducts(
            products => {
                this.products = products;
            }, error => {
                this.error = ProductsError.LOAD_FAIL;
            });

    }

}
