import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../Services/orders.service";

@Component({
  selector: "app-confirm-orders-restaurant",
  templateUrl: "./confirm-orders-restaurant.component.html",
  styleUrls: ["./confirm-orders-restaurant.component.css"],
})
export class ConfirmOrdersRestaurantComponent implements OnInit {
  user: any = {};
  orders: any = [];
  orderSelected: any = {};

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.getOrdersByRestaurantId();
  }

  getOrdersByRestaurantId() {
    this.orders = [];
    this.ordersService.getAllOrdersByRestaurantId(this.user.lastName).then(
      (res) => {
        this.orders = res;
        for (var i = 0; i < this.orders.length; i++) {
          if (this.orders[i].statusOrder === "Pending") {
            this.orders[i].trigger1 = false;
            this.orders[i].trigger2 = false;
            this.orders[i].trigger3 = true;
          } else {
            this.orders[i].trigger1 = true;
            this.orders[i].trigger2 = true;
            this.orders[i].trigger3 = false;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(order) {
    this.orderSelected = order;
  }

  acceptOrder() {
    this.orderSelected.statusOrder = "Processed";
    this.updateOrder();
  }

  refuseOrder() {
    this.orderSelected.statusOrder = "Canceled";
    this.updateOrder();
  }
  deliverOrder() {
    this.orderSelected.statusOrder = "Delivered";
    this.updateOrder();
  }
  updateOrder() {
    this.ordersService
      .updateStatusOrder(this.orderSelected.id, this.orderSelected)
      .then(
        (_) => {
          this.orderSelected.trigger1 = true;
          this.orderSelected.trigger2 = true;
          this.orderSelected.trigger3 = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
