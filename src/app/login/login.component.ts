import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserLoginService } from "../services/user-login.service";
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from "../services/cognito.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone_number: string;
  password: string;
  errorMessage: string;
  mfaStep = false;
  mfaData = {
      destination: '',
      callback: null
  };

  constructor(public router: Router,
              public userService: UserLoginService) {
      console.log("LoginComponent constructor");
  }

  ngOnInit() {
      this.errorMessage = null;
      console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
      this.userService.isAuthenticated(this);
  }

  onLogin() {
      if (this.phone_number == null || this.password == null) {
          this.errorMessage = "All fields are required";
          return;
      }
      this.errorMessage = null;
      this.userService.authenticate(this.phone_number, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
      if (message != null) { //error
          this.errorMessage = message;
          console.log("result: " + this.errorMessage);
      } else { //success
          this.router.navigate(['/secure']);
      }
  }

  handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
      this.mfaStep = true;
      this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
      this.mfaData.callback = (code: string) => {
          if (code == null || code.length === 0) {
              this.errorMessage = "Code is required";
              return;
          }
          this.errorMessage = null;
          callback(code);
      };
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (isLoggedIn) {
          this.router.navigate(['/secure']);
      }
  }

  cancelMFA(): boolean {
      this.mfaStep = false;
      return false;   //necessary to prevent href navigation
  }

}
