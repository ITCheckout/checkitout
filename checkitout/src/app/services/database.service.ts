import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Item } from '../models/item';
import { Category, SubCategory } from '../models/category';
// import { Model } from '../models/model';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { Users } from '../models/users';

import { take } from 'rxjs/operators';
// import { DatePipe } from '@angular/common';

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

      queryResult.pipe(take(1)).subscribe(data => {
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
    var fname;
    var lname;
    var condition;
    var checkedIn = 'false';

    this.firestore.collection<Users>('users').doc(pawprint).valueChanges().subscribe(data => {
      fname = data.fname;
      lname = data.lname;
    });

    this.firestore.collection<Item>('items').doc(barcode).valueChanges().subscribe(data => {
      condition = data.condition;
    });

    setTimeout(() => {

    this.firestore.collection('orders').doc().set({
      'barCode': barcode,
      'pawprint': pawprint,
      'dueDate': dueDate,
      'checkedOut': dateNow,
      'fname': fname,
      'lname': lname,
      'condition': condition,
      'checkedIn': checkedIn
    });
      
    // console.log(id)
    }, 1500);
    this.setItemUnavailable(barcode);

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
    this.createOrder(barcode, pawprint, dueDate, dateNow);
    const docQuery =this.firestore.collection<Item>('items').doc(barcode).valueChanges();
    var condition;
    docQuery.subscribe(data => {
      condition = data.condition;
    });

    setTimeout(() => {
    docQuery.pipe(take(1)).subscribe((data: any) => {
      //the arrayUnion allows the user to put multiple items in the history array:
      //https://stackoverflow.com/questions/69139443/property-auth-does-not-exist-on-type-typeof-import-firebase-auth
      this.firestore.collection('items').doc(barcode).update({
        'history': firebase.firestore.FieldValue.arrayUnion({
          'pawprint': pawprint,
          'dueDate': dueDate,
          'condition': condition,
        })
      });
      
    });
    }, 1000);
  }

  addItem(barcode) {
    this.firestore.collection('items').doc(barcode).set
  }

  getCheckedOutItems() {
    return this.firestore.collection('orders', ref => ref.where('checkedIn', '==', 'false')).valueChanges({ idField: 'id' });
  }
  
  checkInItem(barcode, condition, turnInDate, notes, orderNumber) {
    this.firestore.collection('items').doc(barcode).update({
      'condition': condition,
      'notes': notes,
    });

    this.setItemAvailable(barcode);

    this.firestore.collection('orders').doc(orderNumber).update({
      'checkedIn': 'true',
      'turnInDate': turnInDate,
      'turnInCondition': condition,
    });
  }

  getNotes(barcode) {
    return this.firestore.collection<Item>('items').doc(barcode).valueChanges();
  }

  addComputer(barcode, model, subCategory, condition, notes, status, history) {
    this.firestore.collection('items').doc(barcode).set({
      'model': model,
      'subCategoryName': subCategory,
      'condition': condition,
      'notes': notes,
      'status': status,
      'history': history
    });
  }

  // addOtherEquip(brand, model, condition, barCode) {
  //   this.firestore.collection('items').doc(barcode).set({
  //     'model': model,
  //     'subCategoryName': brand,
  //     'condition': condition,
      
  //   });
  // }
}
