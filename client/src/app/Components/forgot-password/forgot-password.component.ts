import { Component, OnInit } from "@angular/core";
import { UserService } from "../../Services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  emailUser: any = {};

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.emailUser = {};
  }

  send() {
    this.userService.forgotPassword(this.emailUser).then(
      (result) => {
        console.log("Verify your email for further instructions");
      },
      (err) => {
        console.log(err.split(":")[1].split('"')[1]);
      }
    );
  }
}
