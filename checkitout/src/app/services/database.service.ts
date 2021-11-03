import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '@firebase/analytics';
import { SubCategory } from '../models/category';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  itemsCollection = this.firestore.collection('items');

  addItem() {

  }

  getCategories() {
    return this.firestore.collection<SubCategory>('items').valueChanges({ categoryName: 'categoryName', categoryList: 'categoryList' });
  }

  // getSubCategories(category) {
  //   return this.firestore.collection('items').doc(category).valueChanges();
  // }

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
}
