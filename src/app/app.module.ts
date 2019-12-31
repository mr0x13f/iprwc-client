import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

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

const appRoutes: Routes = [
  { path: "",             component: ProductsComponent },
  { path: "product/:id",  component: ProductDetailComponent },
  { path: "wishlist",     component: WishlistComponent },
  { path: "cart",         component: CartComponent },
  { path: "orders",       component: OrdersComponent },
  { path: "user",         component: UserComponent },
  { path: "admin",        component: AdminComponent },
  { path: "login",        component: LoginComponent },
  { path: "register",     component: RegisterComponent },
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
    ProductListItemComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
