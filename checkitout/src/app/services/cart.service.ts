import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cookieService: CookieService) { 
    // let items = JSON.parse(this.cookieService.get('cart'));
  }

  items = [];

  


  addToCart(product) {
    this.items.push(product);
    console.log(this.items);
    this.cookieService.set('cart', JSON.stringify(this.items));
  }

  getItems() {
    return this.cookieService.get('cart') ? JSON.parse(this.cookieService.get('cart')) : [];
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

}
