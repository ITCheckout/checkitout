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
  subCategories;
  items;
  models;



  constructor(private databaseService: DatabaseService) {
    this.mainCategories = null;
    this.subCategories = null;
    this.items = null;
    this.models = null;
    
  }

  ngOnInit(): void {
    this.mainCategories = this.databaseService.getCategories();
    this.subCategories = this.databaseService.getSubCategories(this.mainCategories[0]);
    console.log(this.subCategories)
    this.models = this.databaseService.getModels(this.mainCategories[0], 'laptop-mac');
    this.items = this.databaseService.getItems('laptops', 'laptop-mac', 'late-2013-macbook-pro');
  }

}

