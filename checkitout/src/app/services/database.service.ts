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
  mainCategories;
  models: any[] = [];

  addItem() {

  }

  getAllModels() {
    
    this.firestore.collection<Category>('items').valueChanges().subscribe(categoryData => {
      this.mainCategories = categoryData;
    });
    setTimeout(() => {
      this.mainCategories.forEach(element => {
        // console.log(element.categoryName);
        this.firestore.collection('items').doc(element.categoryName).collection('SubCategories').valueChanges().subscribe(data => {
          data.forEach(subCatElement => {
            // console.log(subCatElement.subCategoryName);
            this.firestore.collection('items').doc(element.categoryName).collection('SubCategories').doc(subCatElement.subCategoryName).collection('Models').valueChanges().subscribe(modelData => {
              modelData.forEach(modelElement => {
                // console.log(modelElement.modelName);
                this.models.push(modelElement);
                // this.firestore.collection('items').doc(element.categoryName).collection('SubCategories').doc(subCatElement.subCategoryName).collection('Models').doc(modelElement.modelName).collection('item-list').valueChanges().subscribe(itemData => {
                //   itemData.forEach(itemElement => {
                //     console.log(itemElement.imagePath);
                //   });
                // }
                // );
              });
            });
          });
        }
        );
      });
    }, 1000);
    // });

    return this.models;
  }

  getCategories() {
    return this.itemsCollection.valueChanges();
  }

  getSubCategories(category) {
    return this.itemsCollection.doc(category).collection("SubCategories").valueChanges();
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
}
