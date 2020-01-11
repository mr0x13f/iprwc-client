import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpService } from './http.service';
import { Order } from '../models/order.model';
import { pipe } from 'rxjs';

@Injectable({providedIn: 'root'})

export class OrderService {

    constructor(
        private httpService:HttpService
    ) {}
    
    public listOrders(next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("orders")
            .pipe( map( response => {
                return <Order[]> response;
            }))
            .subscribe(next, error, complete)

    }

    public getOrderById(orderId:string, next?:(value:any)=>void, error?:(error:any)=>void, complete?:()=>void) {

        this.httpService.get("orders/"+orderId)
            .pipe( map( response => {
                return <Order> response;
            }))
            .subscribe(next, error, complete)

    }

}