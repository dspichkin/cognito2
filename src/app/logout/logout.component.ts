import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLoginService} from "../services/user-login.service";
import {LoggedInCallback} from "../services/cognito.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements LoggedInCallback {

  constructor(public router: Router,
              public userService: UserLoginService) {
      this.userService.isAuthenticated(this)
  }

  isLoggedIn(message: string, isLoggedIn: boolean) {
      if (isLoggedIn) {
          this.userService.logout();
          this.router.navigate(['/home']);
      }

      this.router.navigate(['/home']);
  }
}
