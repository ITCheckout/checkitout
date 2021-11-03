import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SubCategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  itemsCollection = this.firestore.collection('items');

  addItem() {

  }

  getCategories() {
    // var docId: string[] = [];
    // var docRef = this.itemsCollection.ref;
    // docRef.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     console.log(doc.id, ' => ', doc.data());
    //     docId.push(doc.id);
    //   });
    // }).catch(function(error) {
    //   console.log('error: ', error)
    // });

    // return docId;
    return this.firestore.collection<SubCategory>('items').valueChanges({ categoryName: 'categoryName', categoryList: 'categoryList' });
  }

  getSubCategories(category) {
    return this.firestore.collection('items').doc(category).valueChanges();
  }

  getModels(category, subCategory) {
    // var docId: string[] = [];
    // var docRef = this.itemsCollection.doc(category).collection(subCategory).ref;
    // docRef.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     console.log(doc.id, ' => ', doc.data());
    //     docId.push(doc.id);
    //   });
    // }).catch(function(error) {
    //   console.log('error: ', error)
    // });
    // return docId;
    return this.itemsCollection.doc(category).collection(subCategory).valueChanges();
  }

  getModel(category, subCategory, model) {
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).valueChanges();
  }

  getItems(category, subCategory, model) {
  //   var docId: string[] = [];
  //   var docRef = this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').ref;
  //   docRef.get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       console.log(doc.id, ' => ', doc.data());
  //       docId.push(doc.id);
  //     });
  //   }).catch(function(error) {
  //     console.log('error: ', error)
  //   });

  //   return docId;
  // }
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').valueChanges();
  }

  getItem(category, subCategory, model, item) {
    return this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').doc(item).valueChanges();
      
  }
}
