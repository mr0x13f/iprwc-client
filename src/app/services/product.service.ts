import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from "rxjs/operators";
import { Product } from '../models/product.model';

@Injectable({providedIn: 'root'})

export class ProductService {

    constructor(private httpService:HttpService) {}

    public listProducts(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("products")
            .pipe( map( response => {
                return <Product[]> response;
            }))
            .subscribe(next, error, complete)

    }

    public getProductById(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("products/"+productId)
            .pipe( map( response => {
                return <Product> response;
            }))
            .subscribe(next, error, complete)

    }

    public formatPrice(price:number): string {

        let decimal = Math.ceil( price % 1 * 100 );
        let decimalString = decimal.toString();
        decimalString = decimalString.length==2 ? decimalString : ("0"+decimalString);
        decimalString = decimal==0 ? "--" : decimalString;

        return "€" + Math.floor(price) + "," + decimalString;

    }

}