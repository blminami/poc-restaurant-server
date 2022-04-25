import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "../../Services/restaurants.service";
import { OrdersService } from "../../Services/orders.service";
import { IntermediatesService } from "../../Services/intermediates.service";
import { GrowlModule } from "primeng/primeng";
import { Message } from "primeng/primeng";

declare var google;

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  arrayMenuItems: any = [];
  itemSelected: any = {};
  newArray: any = [];
  item: any = {};
  address: any = {};
  origin: any = {};
  arrayDestination = [];
  objDestination: any = {};
  arrayRestaurants: any = [];
  index: any = 0;
  order: any = {};
  currentUser: any = {};
  trigger1: boolean = true;
  trigger2: boolean = true;
  trigger3: boolean = true;
  msgs: Message[] = [];

  constructor(
    private restaurantsService: RestaurantsService,
    private ordersService: OrdersService,
    private intService: IntermediatesService
  ) {}
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.newArray = [];
    this.arrayMenuItems = JSON.parse(localStorage.getItem("arrayCart"));
    if (this.arrayMenuItems === null) this.arrayMenuItems = [];
    else {
      this.trigger1 = false;
      this.trigger2 = false;
      for (var i = 0; i < this.arrayMenuItems.length; i++) {
        var ok = 0;
        this.item = {};
        for (var j = 0; j < this.newArray.length; j++) {
          if (this.arrayMenuItems[i].id === this.newArray[j].menuItemId) ok = 1;
        }
        if (ok === 0) {
          var result = this.countInArray(
            this.arrayMenuItems,
            this.arrayMenuItems[i].id
          );
          this.item.foodType = this.arrayMenuItems[i].foodType;
          this.item.priceItem = this.arrayMenuItems[i].price;
          this.item.quantity = result;
          this.item.menuItemId = this.arrayMenuItems[i].id;
          this.item.totalPrice =
            parseFloat(this.arrayMenuItems[i].price) * result;
          this.newArray.push(this.item);
        }
      }
    }
  }

  onSelect(item) {
    this.itemSelected = item;
  }

  countInArray(array, element) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === element) {
        count++;
      }
    }
    return count;
  }
  increaseQuantity() {
    this.itemSelected.quantity = parseInt(this.itemSelected.quantity) + 1;
    this.itemSelected.totalPrice =
      parseFloat(this.itemSelected.priceItem) *
      parseInt(this.itemSelected.quantity);
  }
  dicreaseQuantity() {
    if (parseInt(this.itemSelected.quantity) > 1) {
      this.itemSelected.quantity = parseInt(this.itemSelected.quantity) - 1;
      this.itemSelected.totalPrice =
        parseFloat(this.itemSelected.priceItem) *
        parseInt(this.itemSelected.quantity);
    }
  }
  deleteItem() {
    var index = this.newArray.indexOf(this.itemSelected);
    this.newArray.splice(index, 1);
    console.log(this.newArray.length);
    if (this.newArray.length === 0) {
      this.trigger1 = true;
      this.trigger2 = true;
      this.trigger3 = true;
      localStorage.removeItem("arrayCart");
      this.showSuccess("Item deleted from order");
    }
  }

  processOrder() {
    this.origin = {};
    this.arrayDestination = [];
    this.arrayRestaurants = [];
    if (
      this.address.city !== undefined &&
      this.address.city !== "" &&
      this.address.street !== undefined &&
      this.address.street !== "" &&
      this.address.number !== undefined &&
      this.address.number !== ""
    ) {
      this.restaurantsService.getAllRestaurants().then(
        (restaurants) => {
          this.arrayRestaurants = restaurants;
          console.log(this.arrayRestaurants);
          this.origin =
            this.address.number +
            " " +
            this.address.street +
            ", " +
            this.address.city;

          for (var i = 0; i < this.arrayRestaurants.length; i++) {
            this.objDestination = {};
            this.objDestination.lat = this.arrayRestaurants[i].latitude;
            this.objDestination.lng = this.arrayRestaurants[i].longitude;

            this.arrayDestination.push(this.objDestination);
          }
          console.log(this.arrayDestination);
          this.trigger3 = false;
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [this.origin],
              destinations: this.arrayDestination,
              travelMode: "DRIVING",
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false,
            },
            function (response, status) {
              if (status === "OK") {
                var minDistance = 99999999999999999999999999999999999999999;
                this.index = 0;
                localStorage.removeItem("index");
                for (var i = 0; i < response.rows[0].elements.length; i++) {
                  var distance = 0;
                  distance = parseFloat(
                    response.rows[0].elements[i].distance.value
                  );
                  console.log(distance);
                  if (minDistance > distance) {
                    minDistance = distance;
                    this.index = i;
                  }
                }
                localStorage.setItem("index", this.index.toString());
                document.getElementById("output").innerHTML +=
                  "The order was processed. By pressing Confirm order, you confirm your address and the menu items ordered. ";
              } else console.log(status);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  confirmOrder() {
    console.log(this.origin);
    this.order = {};
    this.index = localStorage.getItem("index");
    this.order.date = new Date();
    this.order.statusOrder = "Pending";
    this.order.userId = parseInt(this.currentUser.id);
    this.order.restaurantId = parseInt(this.arrayRestaurants[this.index].id);
    this.order.address = this.origin;

    this.ordersService
      .saveOrder(this.order, this.order.restaurantId, this.order.userId)
      .then(
        (res) => {
          console.log(res);
          this.order = {};
          this.order = res;
          console.log("res " + this.order.id);
          for (var i = 0; i < this.newArray.length; i++) {
            this.newArray[i].orderId = this.order.id;
            this.intService
              .saveIntermediate(
                this.newArray[i],
                this.newArray[i].orderId,
                this.newArray[i].menuItemId
              )
              .then(
                (res) => {
                  console.log(res);
                  localStorage.removeItem("arrayCart");
                  this.showSuccess("Order saved");
                },
                (err) => {
                  this.showError("Unable to save the order! Try again");
                }
              );
          }
        },
        (err) => {
          this.showError("Unable to save the order! Try again");
        }
      );
  }

  deleteOrder() {
    localStorage.removeItem("index");
    localStorage.removeItem("arrayCart");
    this.arrayMenuItems = [];
    this.newArray = [];
    this.trigger1 = true;
    this.trigger2 = true;
    this.trigger3 = true;
  }

  showSuccess(message) {
    this.msgs = [];
    this.msgs.push({
      severity: "success",
      summary: "Success Message",
      detail: message,
    });
  }

  showWarn(message) {
    this.msgs = [];
    this.msgs.push({
      severity: "warn",
      summary: "Warn Message",
      detail: message,
    });
  }

  showError(message) {
    this.msgs = [];
    this.msgs.push({
      severity: "error",
      summary: "Error Message",
      detail: message,
    });
  }
}
