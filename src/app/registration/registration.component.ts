import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserRegistrationService} from "../services/user-registration.service";

export class RegistrationUser {
    name: string;
    email: string;
    phone_number: string;
    password: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationUser: RegistrationUser;
  errorMessage: string;

  constructor(public userRegistration: UserRegistrationService, public router: Router) { }

  ngOnInit() {
    this.registrationUser = new RegistrationUser();
    this.errorMessage = null;
  }

  onRegister() {
      this.errorMessage = null;
      this.userRegistration.register(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
      if (message != null) { //error
          this.errorMessage = message;
          console.log("result: " + this.errorMessage);
      } else { //success
          //move to the next step
          console.log("redirecting");
          this.router.navigate(['/confirm', result.user.username]);
      }
  }

}
