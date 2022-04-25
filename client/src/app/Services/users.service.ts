import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
  private url =
    "https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/api";

  constructor(private http: Http) {}

  getAll() {
    return this.http
      .get(this.url + "/users")
      .map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http
      .get(this.url + "/users/current")
      .map((response: Response) => response.json());
  }

  create(user: any) {
    return this.http.post(this.url + "/users/register", user);
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + "/users/" + id).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateUser(id, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.url + "/users/" + id, data)
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

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/forgotPassword", email).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/resetPassword", data).subscribe(
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
