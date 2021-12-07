import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database.service';
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



  constructor(private afAuth: AngularFireAuth, private databaseService: DatabaseService) { }

  mbp2015 = [];
  mbp2015Available = 0;
  mbp2015Unavailable = 0;
  mbp2017 = [];
  mbp2017Available = 0;
  mbp2017Unavailable = 0;
  dell = [];
  dellAvailable = 0;
  dellUnavailable = 0;

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

    this.mbp2015 = this.databaseService.getItemCount('Mid 2015 MacBook Pro');
    this.mbp2017 = this.databaseService.getItemCount('Mid 2017 MacBook Pro');
    this.dell = this.databaseService.getItemCount('Dell Latitude 5580');
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
