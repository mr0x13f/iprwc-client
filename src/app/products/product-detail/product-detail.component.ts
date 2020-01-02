import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: Product;
    productNotFound = false;

    constructor(private route:ActivatedRoute, private httpService:HttpService, private productService:ProductService ) { }

    ngOnInit() {

        let productId = this.route.snapshot.params["id"];

        this.productService.getProductById( productId, product => {
            this.product = product;
        }, error => {
            this.productNotFound = true;
        });

    }

}
