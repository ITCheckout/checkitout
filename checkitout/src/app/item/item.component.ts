import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private databaseService: DatabaseService,
    private cartService: CartService,
    private _snackbar: MatSnackBar) { }

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
    console.log(item)
    this._snackbar.open('Item added to cart', '', {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
    // console.log(item);
  }

}
