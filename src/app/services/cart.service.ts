import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpService } from './http.service';
import { CartItem } from '../models/cart-item.model';

@Injectable({providedIn: 'root'})

export class CartService {

    constructor(private httpService:HttpService) {}
    
    public checkout(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("cart/checkout")
            .subscribe(next, error, complete)

    }

    public listCartItems(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("cart")
            .pipe( map( response => {
                return <CartItem[]> response;
            }))
            .subscribe(next, error, complete)

    }

    public getCartItemById(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("cart/"+productId)
            .pipe( map( response => {
                return <CartItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public addToCart(cartItem:CartItem, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.post("cart", cartItem)
            .pipe( map( response => {
                return <CartItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public updateCartItem(productId:string, cartItem:CartItem, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.put("cart/"+productId, cartItem)
            .pipe( map( response => {
                return <CartItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public deleteCartItem(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.delete("cart/"+productId)
            .pipe( map( response => {
                return <CartItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public clearCart(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.delete("cart")
            .pipe( map( response => {
                return <CartItem> response;
            }))
            .subscribe(next, error, complete)

    }

}