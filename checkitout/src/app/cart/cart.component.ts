import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { Subscription } from 'rxjs';

import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { User } from '../shared/user';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { validateBasis } from '@angular/flex-layout';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {
  // items = this.cartService.getItems();
  format: string = "longDate";   
  public items = [];
   noItems: boolean;
  private subscription: Subscription


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
      pawPrintControl: new FormControl('', Validators.required),
      dueDateControl: new FormControl('', Validators.required)
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

  get pawPrintControl() { return this.cartForm.get('pawPrintControl') }
  get dueDateControl() { return this.cartForm.get('dueDateControl') }

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
 cartErrorMessage;

 checkPawprint() {
  const pawprints = this.databaseService.getPawPrints(); 
  const formPawprint = this.pawPrintControl.value;
  if(pawprints.includes(formPawprint)) {
    this.cartError = false;
  } else {
    this.cartError = true;
    this.cartErrorMessage = "Pawprint does not exist";
  }

 }
 //this gets the specific user from the database
  checkUser() {
    this.checkPawprint();

    if(this.cartForm.valid) {
         //the take(1) method is used in the pipe because this function was running twice for some reason
         this.databaseService.getUser(this.pawPrintControl.value).pipe(take(1)).subscribe(user => {
          this.cartError = false;
            this.addCartData();
        }, err => {
          this.cartError = true;
          console.log('try' + this.cartError);
        });

    } 
     else {
      this.cartError = true;
      this.cartErrorMessage = "Please Fill Out All Fields";
    }

    
    
  } 

  //this adds the user and item to the database
  //Date time: https://stackoverflow.com/questions/64365142/how-do-i-convert-date-and-time-in-different-time-zone
  addCartData() {
    const dateNow = this.datePipe.transform(Date.now(), this.format, "CST");
    const dueDateNow = this.datePipe.transform(this.dueDateControl.value, 'longDate', "CST");
    this.items.forEach(item => {
      this.databaseService.addCartData(this.pawPrintControl.value, item.barCode, dueDateNow, dateNow);
    });

  }
}
