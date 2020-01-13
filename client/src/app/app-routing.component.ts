import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAll } from "./Guards/auth.guardsAll";
import { LoginComponent } from "./Components/login/login.component";
import { HomePageComponent } from "./Components/home-page/home-page.component";
import { ForgotPasswordComponent } from "./Components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./Components/reset-password/reset-password.component";
import { CreateAccountComponent } from "./Components/create-account/create-account.component";
import { OrdersComponent } from "./Components/orders/orders.component";
import { UserProfileComponent } from "./Components/user-profile/user-profile.component";
import {ConfirmOrdersRestaurantComponent}  from "./Components/confirm-orders-restaurant/confirm-orders-restaurant.component"
import { RestaurantsComponent } from "./Components/restaurants/restaurants.component";


const routes: Routes = [
    { path: '', redirectTo: '/home-page', pathMatch: 'full'},
      { path: 'home-page', component:  HomePageComponent, canActivate: [AuthGuardAll] },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/token/:id', component: ResetPasswordComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'orders', component:  OrdersComponent, canActivate: [AuthGuardAll] },
      { path: 'user-profile', component:  UserProfileComponent, canActivate: [AuthGuardAll] },
      { path: 'restaurant-confirm-orders', component:  ConfirmOrdersRestaurantComponent, canActivate: [AuthGuardAll] },
      { path: 'restaurants', component:  RestaurantsComponent, canActivate: [AuthGuardAll] },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }