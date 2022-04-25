import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AgmCoreModule } from "@agm/core";
import { GrowlModule } from "primeng/primeng";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.component";

import { UserService } from "./Services/users.service";
import { AuthenticationService } from "./Services/authentication.service";
import { MenuItemsService } from "./Services/menuItems.service";
import { RestaurantsService } from "./Services/restaurants.service";
import { OrdersService } from "./Services/orders.service";
import { IntermediatesService } from "./Services/intermediates.service";

import { LoginComponent } from "./Components/login/login.component";
import { HomePageComponent } from "./Components/home-page/home-page.component";

import { AuthGuardAll } from "./Guards/auth.guardsAll";
import { customHttpProvider } from "./customHttp";

import { SignUpComponent } from "./Components/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./Components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./Components/reset-password/reset-password.component";
import { CreateAccountComponent } from "./Components/create-account/create-account.component";
import { MainMenuComponent } from "./Components/main-menu/main-menu.component";
import { MenuRestaurantComponent } from "./Components/menu-restaurant/menu-restaurant.component";
import { OrdersComponent } from "./Components/orders/orders.component";
import { UserProfileComponent } from "./Components/user-profile/user-profile.component";
import { HomePageModalComponent } from "./Components/home-page/home-page-modal/home-page-modal.component";
import { AddRestaurantsModalComponent } from "./Components/home-page/add-restaurants-modal/add-restaurants-modal.component";
import { UserItemsModalComponent } from "./Components/user-profile/user-items-modal/user-items-modal.component";
import { ConfirmOrdersRestaurantComponent } from "./Components/confirm-orders-restaurant/confirm-orders-restaurant.component";
import { RestaurantsComponent } from "./Components/restaurants/restaurants.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CreateAccountComponent,
    MainMenuComponent,
    MenuRestaurantComponent,
    OrdersComponent,
    UserProfileComponent,
    HomePageModalComponent,
    AddRestaurantsModalComponent,
    UserItemsModalComponent,
    ConfirmOrdersRestaurantComponent,
    RestaurantsComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "",
      libraries: [""],
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    GrowlModule,
  ],
  providers: [
    customHttpProvider,
    UserService,
    AuthenticationService,
    AuthGuardAll,
    MenuItemsService,
    RestaurantsService,
    OrdersService,
    IntermediatesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
