import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { 

  }


  items = [];

  ngOnInit() {

  }


  addToCart(product) {
    const productDict = {
      'barCode': product.barCode,
      'imagePath': product.imagePath,
      'location': product.location,
      'model': product.model
    }
    this.items.push(productDict);
    console.log(this.items);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getItems() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  deleteItem(product) {
    //delete index from items array collection
    const itemsArray = JSON.parse(localStorage.getItem('cart'))
    const index2 = itemsArray.findIndex(i => i.barCode === product.barCode)
    const removed = itemsArray.splice(index2, 1)
    localStorage.setItem('cart', JSON.stringify(itemsArray))
  }

}
