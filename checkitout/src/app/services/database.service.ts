import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Item } from '../models/item';
import { Category, SubCategory } from '../models/category';
// import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  itemsCollection = this.firestore.collection('items');
  categoryCollection = this.firestore.collection('categories');
  mainCategories;
  models: any[] = [];


  // WORKING QUERIES

  getCategories() {
    return this.firestore.collection('categories').valueChanges();
  }

  getSubCategories(category) {
    return this.categoryCollection.doc(category).collection("subCategories").valueChanges();
  }

  getAllModels() {
    return this.firestore.collection('items').valueChanges();
  }
  getModel(model) {
    return this.firestore.collection('items', ref => ref.where('model', '==', model)).valueChanges();
  }
  getUniqueModels() {
    var uniqueModels = [];
    var returnvalue;
    
    returnvalue = this.firestore.collection<Item>('items').valueChanges( { model: 'model' } );
    
    returnvalue.subscribe(data => {
      data.forEach(element => {
        if(!uniqueModels.includes(element.model)) {
          uniqueModels.push(element.model);
        }
      }); 
    });

    return uniqueModels;
  }

  queryUniqueModel(uniqueModels) {
    var queryResult;
    var uniqueModelList = [];

    var forbidLoop = 0

    uniqueModels.forEach(element => {
      queryResult = this.firestore.collection('items', ref => ref.where('model', '==', element).limit(1)).valueChanges()

      queryResult.subscribe(data => {

        if(forbidLoop < uniqueModels.length) {
          uniqueModelList.push(data);
        }

        forbidLoop++;
      });
    });
    return uniqueModelList;
  }

  getItemsInCategory(category) {
    var queryResult;
    var uniqueModels = [];

    queryResult = this.firestore.collection<Item>('items', ref => ref.where('categoryName', '==', category)).valueChanges();

    queryResult.subscribe(data => {
      data.forEach(element => {
        if(!uniqueModels.includes(element.model)) {
          uniqueModels.push(element.model);
        }
      }); 
    });

    return uniqueModels;
  }

  getItemsInSubCategory(subCategory) {
    var queryResult;
    var uniqueModels = [];

    queryResult = this.firestore.collection<Item>('items', ref => ref.where('subCategoryName', '==', subCategory)).valueChanges();
  
    queryResult.subscribe(data => {
      data.forEach(element => {
        if(!uniqueModels.includes(element.model)) {
          uniqueModels.push(element.model);
        }
      }); 
    });
    return uniqueModels;
  }

  filterCategory(uniqueModels) {
    var queryResult;
    var uniqueModelList = [];

    var forbidLoop = 0

    uniqueModels.forEach(element => {
      queryResult = this.firestore.collection('items', ref => ref.where('model', '==', element).limit(1)).valueChanges()

      queryResult.subscribe(data => {

        if(forbidLoop < uniqueModels.length) {
          uniqueModelList.push(data);
        }

        forbidLoop++;
      });
    });
    return uniqueModelList;
  }

}
