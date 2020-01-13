import { Component, OnInit } from '@angular/core';
import { OrdersService} from '../../Services/orders.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userAccount:any = {};
  orders:any = [];
  orderSelected: any = {};
  
  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.userAccount = JSON.parse(localStorage.getItem('currentUser'));
    this.getOrders();
  }
  
  getOrders(){
    this.ordersService.getAllOrdersByUserId(this.userAccount.id)
    .then((res)=>{
      this.orders = res;
      
      console.log(this.orders);
    }, (err)=>{
      console.log(err);
    })
  }
  onSelect(item){
    this.orderSelected = item;
  }
  
  deleteOrder(){
    this.ordersService.deleteOrder(this.orderSelected.id)
    .then((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })
  }

}
