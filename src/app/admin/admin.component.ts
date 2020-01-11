import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

enum AdminError {
    NONE,
    LOAD_FAIL,
    DELETE_FAIL,
}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    error = AdminError.NONE;
    AdminError: typeof AdminError = AdminError;

    products: Product[] = [];

    constructor(
        private authService:AuthService,
        private productService:ProductService,
    ) { }

    ngOnInit() {

        if (this.authService.requireLogin()) return;

        this.productService.listProducts(
            products => {
                this.products = products;
            }, error => {
                this.error = AdminError.LOAD_FAIL;
            });

    }


}
