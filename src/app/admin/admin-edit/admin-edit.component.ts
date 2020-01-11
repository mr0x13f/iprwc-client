import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-admin-edit',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

    product: Product;

    constructor(
        private authService:AuthService,
        private productService:ProductService,
    ) { }

    ngOnInit() {

        if (this.authService.requireAdmin()) return;

        this.product = new Product(
            "",
            "name",
            "description",
            6.9,
            "https://images-na.ssl-images-amazon.com/images/I/81i0vaqcbrL.jpg"
        );

    }

}
