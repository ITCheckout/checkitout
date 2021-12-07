import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { User } from '../shared/user';
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
    private cookieService: CookieService,
    private fb: FormBuilder,
    private databaseService: DatabaseService
  ) { this.cartService.getItems(); }


  cartForm!: FormGroup;

  ngOnInit(): void {
   this.cartForm= this.fb.group({
      pawprint: ['']
    });
    this.items = this.cartService.getItems();
    // console.log("items", this.items);
    if(this.items.length == 0) {
      this.noItems = true
    } else {
      this.noItems = false
    }
    // console.log("noItems", this.noItems);
  }
  get pawprint() {return this.cartForm.get('pawprint')}

  deleteItem(item) {
    this.cartService.deleteItem(item);
    // window.location.reload();
  }

  clearCart() {
    this.cartService.clearCart();
    window.location.reload();
  }

  //get Users from Firestore
 users: any;

 //this gets the specific user from the database
  getUser() {
    const {pawprint} = this.cartForm.value;
    this.databaseService.getUser(pawprint).subscribe(
      (data: User) => {
        this.users = data;
        console.log(this.users);
      }
    );
    if(this.users  == null) {
      alert("User not found");
    }
  }

}
