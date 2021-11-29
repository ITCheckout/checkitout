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


  // IN PROGRESS QUERIES 

  addItem() {

  }

  // getItemsInSubCategory(category, subCategory) {
  //   return this.firestore.collection<Item>('items', ref => ref.where('categoryName', '==', category).where('subCategoryName', '==', subCategory)).valueChanges();
  // }
  // getModels(category, subCategory) {
  //   return this.itemsCollection.doc(category).collection<Model>(subCategory).valueChanges( { imagePath: 'imagePath', itemTitle: 'itemTitle' });
  // }

  // getModel(category, subCategory, model) {
  //   return this.itemsCollection.doc(category).collection(subCategory).doc(model).
  // }

  // getItems(category, subCategory, model) {
  //   return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection<Item>('item-list').valueChanges( { imagePath: 'imagePath', itemTitle: 'itemTitle' });
  // }

  // getItem(category, subCategory, model, item) {
  //   return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').doc(item).valueChanges();
      
  // }


  getUniqueModels() {
    var uniqueModels = [];
    var returnvalue;
    
    returnvalue = this.firestore.collection<Item>('items').valueChanges( { model: 'model' } );
    
    returnvalue.subscribe(data => {
      data.forEach(element => {
        if(!uniqueModels.includes(element.model)) {
          // console.log(element.model);
          uniqueModels.push(element.model);
        }
      }); 
    });

    return uniqueModels;
  }

  queryUniqueModel(uniqueModels) {
    var queryResult;
    var returnthing = [];

    var forbidLoop = 0

    uniqueModels.forEach(element => {
      queryResult = this.firestore.collection('items', ref => ref.where('model', '==', element).limit(1)).valueChanges()

      queryResult.subscribe(data => {

        if(forbidLoop < uniqueModels.length) {
          // console.log('add value to array')
          returnthing.push(data);
        }

        forbidLoop++;
      });
    });
    // console.log(returnthing);
    return returnthing;  }
}
