import { Component, OnInit, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { DatabaseService } from '../services/database.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {

  models;
  categories;
  subCategories;
  uniqueModels;
  uniqueModelResult: any = [];
  selectCategory!: FormGroup;

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) { }

  ngOnInit(): void {

    this.selectCategory = this.fb.group({
      category: new FormControl(''),
      subCategory: new FormControl('')
    })

    this.databaseService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.uniqueModels = this.databaseService.getUniqueModels();


    setTimeout(() => {
      this.uniqueModelResult = this.databaseService.queryUniqueModel(this.uniqueModels);
    }, 1000);

  }

  categorySelected(event) {
    this.databaseService.getSubCategories(event).subscribe(data => {
      this.subCategories = data;
    });

    var filteredItems = null;
    this.uniqueModelResult = null;

    var categoryItemArray = this.databaseService.getItemsInCategory(event);
    
    setTimeout(() => {
    filteredItems = this.databaseService.filterCategory(categoryItemArray);
    this.uniqueModelResult = filteredItems;
    }, 1000);

  }

  subCategorySelected(event) {
    var filteredItems = null;
    this.uniqueModelResult = null;

    var categoryItemArray = this.databaseService.getItemsInSubCategory(event);
    
    setTimeout(() => {
    filteredItems = this.databaseService.filterCategory(categoryItemArray);
    this.uniqueModelResult = filteredItems;
    }, 1000);
  }

}

