import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {

    @Input("product") product: Product;

    constructor() { }

    ngOnInit() {
    }

}
