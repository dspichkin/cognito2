import {Inject, Injectable} from "@angular/core";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";

import {RegistrationUser} from "../registration/registration.component";
import {CognitoCallback, CognitoUtil} from "./cognito.service";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) { }

  register(user: RegistrationUser, callback: CognitoCallback): void {
      console.log("UserRegistrationService: user is " + user);

      let attributeList = [];

      let dataEmail = {
          Name: 'email',
          Value: user.email
      };
      let dataNickname = {
          Name: 'nickname',
          Value: user.name
      };
      attributeList.push(new CognitoUserAttribute(dataEmail));
      attributeList.push(new CognitoUserAttribute(dataNickname));
      attributeList.push(new CognitoUserAttribute({
          Name: 'phone_number',
          Value: user.phone_number
      }));

      this.cognitoUtil.getUserPool().signUp(user.phone_number, user.password, attributeList, null, function (err, result) {
          if (err) {
              callback.cognitoCallback(err.message, null);
          } else {
              console.log("UserRegistrationService: registered user is " + result);
              callback.cognitoCallback(null, result);
          }
      });

  }

  confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {
      let userData = {
          Username: username,
          Pool: this.cognitoUtil.getUserPool()
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
          if (err) {
              callback.cognitoCallback(err.message, null);
          } else {
              callback.cognitoCallback(null, result);
          }
      });
  }
}
