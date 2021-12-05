import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  addToCart(product) {
    this.items.push(product);
    this.cookieService.set('cart', JSON.stringify(this.items));
    console.log(this.items)
  }

  getItems() {
    return this.cookieService.get('cart') ? JSON.parse(this.cookieService.get('cart')) : [];
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  constructor(private cookieService: CookieService) { }
}
