import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '@firebase/analytics';
import { Category, SubCategory } from '../models/category';
import { Model } from '../models/model';

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


  // IN PROGRESS QUERIES 

  addItem() {

  }


  getAllModels(category) {
    this.firestore.collection('items', ref => ref.where('categoryName', '==', category)).valueChanges();
  }
  

  

  getItemsInSubCategory(category, subCategory) {
    return this.firestore.collection<Item>('items', ref => ref.where('categoryName', '==', category).where('subCategoryName', '==', subCategory)).valueChanges();
  }
  getModels(category, subCategory) {
    return this.itemsCollection.doc(category).collection<Model>(subCategory).valueChanges( { imagePath: 'imagePath', itemTitle: 'itemTitle' });
  }

  getModel(category, subCategory, model) {
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).valueChanges();
  }

  getItems(category, subCategory, model) {
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection<Item>('item-list').valueChanges( { imagePath: 'imagePath', itemTitle: 'itemTitle' });
  }

  getItem(category, subCategory, model, item) {
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').doc(item).valueChanges();
      
  }


  getUniqueModels() {
    var uniqueModels = [];

    var returnvalue = this.firestore.collection<Item>('items').valueChanges();

    
  }
}
