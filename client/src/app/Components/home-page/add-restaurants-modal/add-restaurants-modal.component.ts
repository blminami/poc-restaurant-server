import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../../../Services/restaurants.service';
import { UserService } from '../../../Services/users.service';


@Component({
  selector: 'app-add-restaurants-modal',
  templateUrl: './add-restaurants-modal.component.html',
  styleUrls: ['./add-restaurants-modal.component.css']
})
export class AddRestaurantsModalComponent implements OnInit {

  restaurant:any = {};
  result:any = {};
  constructor(private restaurantsService: RestaurantsService,
  private userService: UserService) { }

  ngOnInit() {
  }
  
  saveRestaurant(){
    if(this.restaurant.city!==undefined && this.restaurant.city!=="" &&
    this.restaurant.street!==undefined && this.restaurant.street!=="" &&
    this.restaurant.streetNumber!==undefined && this.restaurant.streetNumber!==""){
      
      this.result = {};
      this.restaurantsService.addNewRestaurant(this.restaurant)
      .then((res)=>{
        //adaug  un nou cont
        this.result = res;
        this.restaurant = {};
        this.restaurant.firstName = "Restaurant";
        this.restaurant.lastName = this.result.id;
        this.restaurant.email = "root@root";
        this.restaurant.username = "restaurant" + this.result.id;
        this.restaurant.password = "a";
        
        console.log(this.restaurant);
        this.userService.create(this.restaurant).subscribe(data => {
            console.log("Account created");
          }, (err) => {
            console.log("Create Account - failed! Make sure that the username is not taken and try again.");
          })
      },(err)=>{
        console.log(err);
      })
    }
  }
}
