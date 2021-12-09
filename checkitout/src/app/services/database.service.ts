import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Item } from '../models/item';
import { Category, SubCategory } from '../models/category';
// import { Model } from '../models/model';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
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

  getItemCount(item) {
    var queryResult;
    var availableCount = 0;
    var unavailableCount = 0;
    var count = [];


    queryResult = this.firestore.collection('items', ref => ref.where('model', '==', item)).valueChanges();

      queryResult.subscribe(data => {
        data.forEach(element => {
          if(element.status == "available") {
            availableCount++;
          } else if (element.status == "unavailable") {
            unavailableCount++;
          }
          else {
            
          }
        });
      });

      setTimeout(() => {
        count.push(availableCount);
        count.push(unavailableCount);
      }, 1000);
    
      // console.log(count);
    return count;    
  }


  getItem(item) {
    return this.firestore.collection('items', ref => ref.where('model', '==', item)).valueChanges();
  }

  getUser(pawprint) {
    return this.firestore.collection('users').doc(pawprint).valueChanges();
  }

  setItemUnavailable(barcode) {
    this.firestore.collection('items').doc(barcode).update({
      status: "unavailable"
    });
  }

  setItemAvailable(barcode) {
    this.firestore.collection('items').doc(barcode).update({
      status: "available"
    });
  }

  createOrder(barcode, pawprint, dueDate, dateNow) {
    this.firestore.collection('orders').doc(barcode).set({
      'barcode': barcode,
      'pawprint': pawprint,
      'dueDate': dueDate,
      'checkedOut': dateNow,
      'history': []
    });
  }

  getPawPrints() {
    var queryResult;
    var pawPrints = [];

    queryResult = this.firestore.collection('users').valueChanges();

    queryResult.subscribe(data => {
      data.forEach(element => {
        pawPrints.push(element.pawprint);
      });
    });
    return pawPrints;
    
  }
  
  addCartData(pawprint, barcode, dueDate, dateNow) {
    
    //since we are adding a 'history' section to the order document, we need two cases....
    //1. if the order document already exists
    //2. if the order document does not exist
    this.firestore.collection('orders').doc(barcode).get().subscribe(doc => {
      //if order document does not exist, we have no history of checkout 
      if (!doc.exists) {
        this.createOrder(barcode, pawprint, dueDate, dateNow);
      } else {
        const docQuery =this.firestore.collection('orders').doc(barcode).valueChanges();
        docQuery.pipe(take(1)).subscribe((data: any) => {
          const pastPawprint = data.pawprint;
          const pastDueDate = data.dueDate;
          //the arrayUnion allows the user to put multiple items in the history array:
          //https://stackoverflow.com/questions/69139443/property-auth-does-not-exist-on-type-typeof-import-firebase-auth
          this.firestore.collection('orders').doc(barcode).update({
            'pawprint': pawprint,
            'dueDate': dueDate,
            'history': firebase.firestore.FieldValue.arrayUnion({
              'pawprint': pastPawprint,
              'pastDueDate': pastDueDate
            })
          });
        });
      }
      // this.setItemUnavailable(barcode);
    });
  }


  
  
}
