import { Component, OnInit, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { DatabaseService } from '../services/database.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  mainCategories;
  items;
  models;

  constructor(private databaseService: DatabaseService, private fb: FormBuilder) { 
    this.mainCategories = null;
    this.items = null;
    this.models = null;
  }

  selectCategory!: FormGroup;
  selectedCategory;
  subCategories;

  ngOnInit(): void {
    this.selectCategory = this.fb.group({
      category: [new FormControl('')],
      subCategory: [new FormControl('')],
    });



     this.databaseService.getCategories().subscribe(categories => {
      this.mainCategories = categories;
    });

    
    // this.databaseService.getModels(this.mainCategories[0], this.mainCategories[0].categoryName[0]).subscribe(models => {
    //   this.models = models;
    // }
    // );
    // this.databaseService.getItems(this.mainCategories[0], this.mainCategories[0].categoryName[0], ).subscribe(items => {
    //   this.items = items;
    // }
    // );
    
  }

  categorySelected(event) {
    this.databaseService.getSubCategories(event).subscribe(subCategories => {
      this.subCategories = subCategories;
      });
  }

  subCategorySelected(event) {
  }
}

