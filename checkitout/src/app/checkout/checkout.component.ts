import { Component, OnInit, Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  barcode: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.barcode = null;
  }

  ngOnInit(): void {
    this.barcode = this.firestore.collection('items').doc('laptops').collection('laptop-mac').doc('late-2013-macbook-pro').get();
    // console.log(this.barcode);
    
  }

}

