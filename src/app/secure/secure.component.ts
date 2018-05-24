import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {UserLoginService} from "../services/user-login.service";
import {LoggedInCallback, CognitoUtil} from "../services/cognito.service";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  cognitoUser;

  constructor(public router: Router, public userService: UserLoginService, public cognitoUtil: CognitoUtil) { 
      this.userService.isAuthenticated(this);
      this.cognitoUser = this.cognitoUtil.getCurrentUser();
      console.log('this.getCurrentUser()', this.cognitoUser )
  }

  ngOnInit() {
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (!isLoggedIn) {
          this.router.navigate(['/login']);
      }
  }
}
