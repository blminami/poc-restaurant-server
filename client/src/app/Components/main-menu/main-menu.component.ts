import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  user: any;
  constructor() { }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
