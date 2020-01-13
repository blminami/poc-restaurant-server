import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MenuItemsService {
    
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private url = 'https://616f41467de44aa9ac47d1a7ee0281b6.vfs.cloud9.us-east-2.amazonaws.com/api';
    
    constructor(private http: Http){
        
    }
    //Get element by category
    getMenuItemsByCategory(category){
         return new Promise((resolve, reject) => {
            this.http.get(this.url + '/menuItems/byCategory/' + category)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    //Save new item to database
      saveItem(item) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/menuItems', item)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    updateItem(id, item) {
        return new Promise((resolve, reject) => {
            this.http.put(this.url + '/menuItems/' + id, item)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
      deleteItem(id) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.url + '/menuItems/' + id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    getMenuItemsById(id){
         return new Promise((resolve, reject) => {
            this.http.get(this.url + '/menuItems/' + id)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}