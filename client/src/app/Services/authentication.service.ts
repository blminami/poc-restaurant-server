import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
  private url =
    "https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/api";

  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http
      .post(this.url + "/users/authenticate", {
        username: username,
        password: password,
      })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
        return user;
      });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("arrayCart");
  }
}
