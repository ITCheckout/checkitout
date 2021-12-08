import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { Subscription } from 'rxjs';

import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {
  // items = this.cartService.getItems();
  format: string = "medium";   
  public items = [];
   noItems: boolean;
  private subscription: Subscription


  pawPrintControl = new FormControl();
  dueDateControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;



  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    private datePipe: DatePipe
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


    this.filteredOptions = this.pawPrintControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.options = this.databaseService.getPawPrints();






  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }











  get pawprint() {return this.cartForm.get('pawprint')}

  deleteItem(item) {
    this.cartService.deleteItem(item);
    console.log(item + "deleted")
    window.location.reload();
  }

  clearCart() {
    this.cartService.clearCart();
    window.location.reload();
  }

  //get Users from Firestore
 users: any;
 cartError;
 //this gets the specific user from the database
  checkUser() {
    //the take(1) method is used in the pipe because this function was running twice for some reason
      this.databaseService.getUser(this.pawPrintControl.value).pipe(take(1)).subscribe(user => {
        this.cartError = false;
          this.addCartData();
      }, err => {
        this.cartError = true;
        console.log('try' + this.cartError);
      });
    
    
  } 

  //this adds the user and item to the database
  addCartData() {
    const dateNow = this.datePipe.transform(Date.now(), this.format, "CST");
    this.items.forEach(item => {
      this.databaseService.addCartData(this.pawPrintControl.value, item.barCode, this.dueDateControl.value, dateNow);
      console.log("added");
    });
  }
}
