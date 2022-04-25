import { Component, OnInit } from "@angular/core";
import { UserService } from "../../Services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.model = {};
  }
  confirm() {
    this.router.params.subscribe((params) => {
      this.model.token = params["id"];
    });
    if (this.model.password === this.model.confirmPassword) {
      this.userService.resetPassword(this.model).then(
        (resul) => {
          console.log("Check your email for confirmation message");
        },
        (err) => {
          console.log("An error occurred! Try again");
        }
      );
    } else {
      console.log("Password does not match the confirm password.");
    }
  }
}
