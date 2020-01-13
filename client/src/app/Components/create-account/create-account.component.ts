import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/users.service';
import { Router } from '@angular/router';
import { GrowlModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  user:any= {};
  msgs: Message[] = [];
  
  constructor( private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.user = {};
  }
  
  createAccount(){
    
    if (this.user.firstName !== null && this.user.firstName !== undefined && this.user.firstName !== ''
        && this.user.lastName !== null && this.user.lastName !== undefined && this.user.lastName !== ''
        && this.user.email !== null && this.user.email !== undefined && this.user.email !== ''
        && this.user.username !== null && this.user.username !== undefined && this.user.username !== ''
        && this.user.password !== null && this.user.password !== undefined && this.user.password !== '') {
          
          this.userService.create(this.user).subscribe(data => {
           this.showSuccess("Account created");
          }, (err) => {
            this.showError("Create Account - failed! Make sure that the username is not taken and try again.");
          })
          
    }else{
          this.showWarn("Fill in all inputs");    
    }
        
  }
  
  showSuccess(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: message });
  }

  showWarn(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: message });
  }

  showError(message) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }

}
