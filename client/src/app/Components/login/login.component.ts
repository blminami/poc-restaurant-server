import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  returnUrl: string;
  user: any = {};
  msgs: Message[] = [];
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
  }
  
  login() {
    console.log(this.user.username + " " + this.user.password);
    if (this.user.username !== undefined && this.user.password !== undefined) {
      this.authenticationService.login(this.user.username, this.user.password)
        .subscribe(
        data => {
          let link = ['/home-page'];
          this.router.navigate(link);
        },
        error => {
          if (error === "Username or password is incorrect") this.showError(error);
          else this.showError("Please verify if the server is running!");
        });
    }
  }

  showError(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }


}
