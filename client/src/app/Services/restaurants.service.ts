import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestaurantsService {
    
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/api';
    
    constructor(private http: Http){}
    
    getAllRestaurants(){
         return new Promise((resolve, reject) => {
            this.http.get(this.url + '/restaurants')
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    addNewRestaurant(restaurant){
         return new Promise((resolve, reject) => {
            this.http.post(this.url + '/restaurants', restaurant)
              .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    deleteRestaurant(id) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.url + '/restaurants/' + id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
}