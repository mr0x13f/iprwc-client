import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProductListItemComponent } from './products/product-list-item/product-list-item.component';
import { HeaderComponent } from './header/header.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { WishlistItemComponent } from './wishlist/wishlist-item/wishlist-item.component';
import { OrderListItemComponent } from './orders/order-list-item/order-list-item.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const appRoutes: Routes = [
    { path: "",                 component: ProductsComponent },
    { path: "product/:id",      component: ProductDetailComponent },
    { path: "wishlist",         component: WishlistComponent },
    { path: "cart",             component: CartComponent },
    { path: "checkout",         component: CheckoutComponent },
    { path: "order-complete",   component: OrderCompleteComponent },
    { path: "orders",           component: OrdersComponent },
    { path: "user",             component: UserComponent },
    { path: "admin",            component: AdminComponent },
    { path: "admin/:id",        component: ProductEditComponent },
    { path: "login",            component: LoginComponent },
    { path: "register",         component: RegisterComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        AppComponent,
        CartComponent,
        WishlistComponent,
        OrdersComponent,
        ProductsComponent,
        UserComponent,
        AdminComponent,
        LoginComponent,
        RegisterComponent,
        ProductDetailComponent,
        ProductListItemComponent,
        HeaderComponent,
        CartItemComponent,
        WishlistItemComponent,
        OrderListItemComponent,
        ProductEditComponent,
        CheckoutComponent,
        OrderCompleteComponent 
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
