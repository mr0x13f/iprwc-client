import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

enum AdminEditError {
    NONE,
    NOT_FOUND,
    CREATE_FAIL,
    UPDATE_FAIL,
    DELETE_FAIL,
}

@Component({
    selector: 'app-admin-edit',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

    error = AdminEditError.NONE;
    AdminEditError: typeof AdminEditError = AdminEditError;

    product: Product;
    isNew: boolean;

    constructor(
        private route:ActivatedRoute,
        private authService:AuthService,
        private productService:ProductService,
    ) { }

    ngOnInit() {

        if (this.authService.requireAdmin()) return;

        let productId = this.route.snapshot.params["id"];
        this.isNew = productId == null;

        if (productId) {

            this.productService.getProductById( productId, product => {

                this.product = product;

            }, error => {
                this.error = AdminEditError.NOT_FOUND;
            });

        } else {

            this.product = new Product(null,null,null,null,null);

        }

    }

}
