import { Injectable } from "@angular/core";
import {
  Headers,
  Http,
  RequestOptions,
  ResponseContentType,
} from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrdersService {
  private headers = new Headers({ "Content-Type": "application/json" });
  private url =
    "https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/api";

  constructor(private http: Http) {}

  getOrderByDate(date) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + "/orders/" + date)
        .map((res) => res.json())
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  saveOrder(order, rid, uid) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url + "/orders/restaurant/" + rid + "/user/" + uid, order)
        .map((res) => res.json())
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getAllOrdersByUserId(userId) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + "/orders/users/" + userId)
        .map((res) => res.json())
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  deleteOrder(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "/orders/" + id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAllOrdersByRestaurantId(restaurantId) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + "/orders/restaurants/" + restaurantId)
        .map((res) => res.json())
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  updateStatusOrder(id, order) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "/orders/" + id, order).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
