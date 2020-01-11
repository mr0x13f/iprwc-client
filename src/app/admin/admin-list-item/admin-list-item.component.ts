import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'app-admin-list-item',
    templateUrl: './admin-list-item.component.html',
    styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {

    @Output("delete") deleteEvent = new EventEmitter<Product>();

    @Input("product") product: Product;

    constructor() { }

    ngOnInit() {
    }

    onDelete() {
        this.deleteEvent.emit(this.product);
    }

}
