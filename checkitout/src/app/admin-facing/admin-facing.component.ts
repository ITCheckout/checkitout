import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatTabsModule } from '@angular/material/tabs';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-facing',
  templateUrl: './admin-facing.component.html',
  styleUrls: ['./admin-facing.component.css']
})
export class AdminFacingComponent implements OnInit {



  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    //log if user is logged in
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
      } else {
        console.log('not logged in');
      }
    });

    console.log(this.afAuth.currentUser);
  }

  selectedValue: string | undefined;

  addItemForm: Category[] = [
    { value: 'computer', viewValue: 'Computer' },
    { value: 'camera', viewValue: 'Camera' },
    { value: 'microphone', viewValue: 'Microphone' },
    { value: 'lights', viewValue: 'Lights' }
  ];

  computer = true;

}
