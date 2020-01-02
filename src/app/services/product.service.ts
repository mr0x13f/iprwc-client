import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Product } from '../models/product.model';
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class ProductService {

    constructor(private httpService:HttpService) {}

    listProducts(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("products")
            .pipe( map( response => {
                return <Product[]> response;
            }))
            .subscribe(next, error, complete)

    }

}