import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private databaseService: DatabaseService,
    private cartService: CartService) { }

  itemCount = [];
  itemDoc;

  ngOnInit(): void {
    const itemName = this.route.snapshot.paramMap.get('model');
    this.databaseService.getModel(itemName).subscribe(data => {
      // console.log(data[0]);
      this.itemDoc = data[0];
    });

    this.itemCount = this.databaseService.getItemCount(itemName);

  }

  addToCart(item) {
    this.cartService.addToCart(item);
    window.alert('Your item,' + item.model + 'has been added to the cart!');
    // console.log(item);
  }

}
