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

  allItems;
  categories;
  subCategories;
  selectCategory!: FormGroup;
  

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) { 
    
  }


  ngOnInit(): void {

    this.selectCategory = this.fb.group({
      category: new FormControl(''),
      subCategory: new FormControl('')
    })

    // this.allItems = this.databaseService.getAllItems();
    this.databaseService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  categorySelected(event) {
    this.databaseService.getSubCategories(event).subscribe(data => {
      this.subCategories = data;
    });
  }

}

