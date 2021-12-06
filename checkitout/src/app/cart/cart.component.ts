import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // items = this.cartService.getItems();
  public items = [];
   noItems: boolean;
  private subscription: Subscription

  constructor(
    private cartService: CartService,
    private cookieService: CookieService
  ) { this.cartService.getItems(); }


  ngOnInit(): void {
    this.items = this.cartService.getItems();
    // console.log("items", this.items);
    if(this.items.length == 0) {
      this.noItems = true
    } else {
      this.noItems = false
    }
    // console.log("noItems", this.noItems);
  }

  deleteItem(item) {
    this.cartService.deleteItem(item);
    // window.location.reload();
  }

  clearCart() {
    this.cartService.clearCart();
    window.location.reload();
  }
}
