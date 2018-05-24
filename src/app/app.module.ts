import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SecureComponent } from './secure/secure.component';
import { LogoutComponent } from './logout/logout.component';
import { routing } from "./app.routes";
import { HomeComponent } from './home/home.component';

import {UserLoginService} from "./services/user-login.service";
import {UserRegistrationService} from "./services/user-registration.service";
import {CognitoUtil} from "./services/cognito.service";
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    SecureComponent,
    LogoutComponent,
    HomeComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CognitoUtil,
    UserRegistrationService,
    UserLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
