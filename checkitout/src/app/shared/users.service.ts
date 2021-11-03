import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  form = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    pawprint: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor( private firestore: AngularFirestore) { }
  
  public currentUser: any;
  public userRole: string;
  //Tutorial helped: https://www.dottedsquirrel.com/angular-firebase-crud/

  //this function will get the data from the sign-up form component, pass it here, and will submit it to the firestore database
  createUser(data: any) {
  }

  setUser(data: any) {
    return this.firestore
      .collection(`users`).doc(data.pawprint).set(data)
  }

  //get user data from firestore database
  getUser(id: string) {
    return this.firestore.collection('users').doc(id).valueChanges();
  }


}
