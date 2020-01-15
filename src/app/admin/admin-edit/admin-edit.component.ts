import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogueService } from 'src/app/services/dialogue.service';

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
        private router:Router,
        private route:ActivatedRoute,
        private authService:AuthService,
        private productService:ProductService,
        private dialogueService:DialogueService
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

    onSave() {

        if (this.isNew) this.create(); else this.update();

    }

    create() {

        this.productService.createProduct( this.product,
            product => {
                this.router.navigate(["/admin"])
            }, error => {
                this.error = AdminEditError.CREATE_FAIL;
            });

    }

    update() {

        this.productService.updateProduct( this.product.productId, this.product,
            product => {
                this.router.navigate(["/admin"])
            }, error => {
                this.error = AdminEditError.UPDATE_FAIL;
            });

    }

    onDelete() {

        this.dialogueService.showMessage("Are you sure you want to delete this product?",
            "Delete", () => {

                this.productService.deleteProduct( this.product.productId,
                    product => {
                        this.router.navigate(["/admin"])
                    }, error => {
                        this.error = AdminEditError.DELETE_FAIL;
                    });

            }, "Cancel");


    }

}
