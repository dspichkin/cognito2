import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ConfirmRegistrationComponent } from "./confirm-registration/confirm-registration.component";
import { SecureComponent} from "./secure/secure.component";
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: '',
        component: AppComponent,
        children: [
          {
              path: 'login',
              component: LoginComponent,
          },
          {
              path: 'logout',
              component: LogoutComponent,
          },
          {
              path: 'register',
              component: RegistrationComponent,
          },
          {
              path: 'confirm/:username',
              component: ConfirmRegistrationComponent,
          },
          {

              path: 'secure',
              component: SecureComponent,
          }
        ]
    },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
