import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpService } from './http.service';
import { Product } from '../models/product.model';

@Injectable({providedIn: 'root'})

export class ProductService {

    constructor(
        private httpService:HttpService
    ) {}

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

    public createProduct(product:Product, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.post("products", product)
            .pipe( map( response => {
                return <Product> response;
            }))
            .subscribe(next, error, complete)

    }

    public updateProduct(productId:string, product:Product, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {
        
        this.httpService.put("products/"+productId, product)
            .pipe( map( response => {
                return <Product> response;
            }))
            .subscribe(next, error, complete)

    }

    public deleteProduct(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {
        
        this.httpService.delete("products/"+productId)
            .subscribe(next, error, complete)

    }

}