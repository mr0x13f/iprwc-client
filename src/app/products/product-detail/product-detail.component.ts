import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.product = new Product(
      this.route.snapshot.params["id"],
      "NAME",
      "DESCRIPTION",
      10.0,
      "https://via.placeholder.com/100");

  }

}
