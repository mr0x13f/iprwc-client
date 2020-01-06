import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpService } from './http.service';
import { WishlistItem } from '../models/wishlist-item.model';

@Injectable({providedIn: 'root'})

export class WishlistService {

    constructor(private httpService:HttpService) {}

    public listWishlistItems(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("wishlist")
            .pipe( map( response => {
                return <WishlistItem[]> response;
            }))
            .subscribe(next, error, complete)

    }

    public getWishlistItemById(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("wishlist/"+productId)
            .pipe( map( response => {
                return <WishlistItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public addToWishlist(WishlistItem:WishlistItem, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.post("wishlist", WishlistItem)
            .pipe( map( response => {
                return <WishlistItem> response;
            }))
            .subscribe(next, error, complete)

    }

    public deleteWishlistItem(productId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.delete("wishlist/"+productId)
            .subscribe(next, error, complete)

    }

    public clearWishlist(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.delete("wishlist")
            .subscribe(next, error, complete)

    }

}