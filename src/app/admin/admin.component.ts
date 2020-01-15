import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { DialogueService } from '../services/dialogue.service';

enum AdminError {
    NONE,
    LOAD_FAIL,
    REMOVE_FAIL,
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
        private dialogueService:DialogueService
    ) { }

    ngOnInit() {

        if (this.authService.requireAdmin()) return;

        this.productService.listProducts(
            products => {
                this.products = products;
            }, error => {
                this.error = AdminError.LOAD_FAIL;
            });

    }

    onDelete(product:Product) {

        this.dialogueService.showMessage("Are you sure you want to delete this product?",
            "Delete", () => {

                this.productService.deleteProduct(product.productId,
                    () => {
        
                        for( let i = 0; i < this.products.length; i++){ 
                            if ( this.products[i] === product) {
                                this.products.splice(i, 1); 
                            }
                        }
        
                    }, error => {
                        this.error = AdminError.REMOVE_FAIL;
                    });

            }, "Cancel")
    }

}
