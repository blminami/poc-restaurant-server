import { Component, OnInit, NgZone } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { RestaurantsService } from "../../Services/restaurants.service";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.css"],
})
export class RestaurantsComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public true: boolean = true;
  arrayRestaurants: any = [];
  objDestination: any = {};
  arrayDestination: any = [];
  gm: any = {};
  user: any = {};
  restaurantSelected: any = {};

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.zoom = 10;
    this.latitude = 44.439663;
    this.longitude = 26.096306;
    this.markersCoordonates();
  }
  markersCoordonates() {
    this.restaurantsService.getAllRestaurants().then(
      (restaurants) => {
        console.log("resturant: ", restaurants);
        this.arrayRestaurants = restaurants;
        console.log(restaurants);
        for (var i = 0; i < this.arrayRestaurants.length; i++) {
          this.objDestination = {};
          this.objDestination.lat = this.arrayRestaurants[i].latitude;
          this.objDestination.lng = this.arrayRestaurants[i].longitude;
          this.objDestination.address =
            "Street " +
            this.arrayRestaurants[i].street +
            ", " +
            this.arrayRestaurants[i].streetNumber;
          this.arrayDestination.push(this.objDestination);
        }
        console.log(this.arrayDestination);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen) {
      gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }
  delete(restaurant) {
    this.restaurantSelected = restaurant;
    this.restaurantsService.deleteRestaurant(this.restaurantSelected.id).then(
      (res) => {
        console.log(res);
        this.arrayRestaurants = this.arrayRestaurants.filter(
          (restaurant) => restaurant.id !== this.restaurantSelected.id
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSelect(restaurant) {
    this.restaurantSelected = restaurant;
  }
}
