import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  itemsCollection = this.firestore.collection('items');

  addItemToInventory() {

  }

  getCategories() {
    var docId: string[] = [];
    var docRef = this.itemsCollection.ref;
    docRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
        docId.push(doc.id);
      });
    }).catch(function(error) {
      console.log('error: ', error)
    });

    return docId;
  }

  getSubCategories(category) {
    
  }

  getModels(category, subCategory) {
    var docId: string[] = [];
    var docRef = this.itemsCollection.doc(category).collection(subCategory).ref;
    docRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
        docId.push(doc.id);
        // console.log(typeof(doc.id));
      });
    }).catch(function(error) {
      console.log('error: ', error)
    });
    // console.log(docId);
    return docId;
  }

  getItems(category, subCategory, model) {
    var docId: string[] = [];
    var docRef = this.itemsCollection.doc(category).collection(subCategory).doc(model).collection('item-list').ref;
    docRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
        docId.push(doc.id);
      });
    }).catch(function(error) {
      console.log('error: ', error)
    });

    return docId;
  }
}
