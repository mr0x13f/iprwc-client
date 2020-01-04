import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products: Product[] = [];
    error = false;

    constructor(private productService:ProductService) { }

    ngOnInit() {

        this.productService.listProducts( products => {
            this.products = products;
        }, error => {
            this.error = true;
        });

    }

}
