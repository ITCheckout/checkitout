import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  itemCount = [0,0];
  itemDoc;
  itemsFromDatabase;
  queryReturnedBool = false;
  displayedColumns: string[] = ['barCode', 'serialNumber', 'status', 'condition', 'location'];
  // dataSource;
  

  

  ngOnInit(): void {
    const itemName = this.route.snapshot.paramMap.get('model');
    this.databaseService.getModel(itemName).subscribe(data => {

      this.itemsFromDatabase = data;
      
      this.itemDoc = data[0];

      this.queryReturnedBool = true;
    });

    this.itemCount = this.databaseService.getItemCount(itemName);

    // this.dataSource = new MatTableDataSource<itemElement>(this.itemsFromDatabase);

  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  addToCart(item) {
    this.cartService.addToCart(item);
    window.alert('Your item,' + item.model + 'has been added to the cart!');
    // console.log(item);
  }

}

// export interface itemElement {
//   barCode: string;
//   status: string;
//   condition: string;
// }
