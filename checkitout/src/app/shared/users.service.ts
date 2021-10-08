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
  
  //Tutorial helped: https://www.dottedsquirrel.com/angular-firebase-crud/

  //this function will get the data from the sign-up form component, pass it here, and will submit it to the firestore database
  createUser(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .add(data)
        .then(res => {}, err => reject(err))
    })
  }
}
