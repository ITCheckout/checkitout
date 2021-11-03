import { Component, OnInit, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { DatabaseService } from '../services/database.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  mainCategories;
  items;
  models;

  constructor(private databaseService: DatabaseService) {
    this.mainCategories = null;
    this.items = null;
    this.models = null;
  }

  ngOnInit(): void {
     this.databaseService.getCategories().subscribe(categories => {
      this.mainCategories = categories;
    });
  }
}

