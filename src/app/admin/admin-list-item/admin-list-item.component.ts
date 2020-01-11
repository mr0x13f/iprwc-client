import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-admin-list-item',
    templateUrl: './admin-list-item.component.html',
    styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {

    @Input("product") product: Product;

    constructor() { }

    ngOnInit() {
    }

}
