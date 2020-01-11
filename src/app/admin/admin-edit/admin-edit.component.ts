import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-admin-edit',
    templateUrl: './admin-edit.component.html',
    styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

    product: Product;

    constructor() { }

    ngOnInit() {

        this.product = new Product(
            "",
            "name",
            "description",
            6.9,
            "https://images-na.ssl-images-amazon.com/images/I/81i0vaqcbrL.jpg"
        );

    }

}
