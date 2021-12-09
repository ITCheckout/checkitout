import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database.service';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
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



  constructor(private afAuth: AngularFireAuth, private databaseService: DatabaseService, private dialog: MatDialog, private fb: FormBuilder) { }

  mbp2015 = [0,0];
  mbp2017 = [0,0];
  dell = [0,0];
  itemsFromDatabase;
  thingdoesthing;
  displayedColumns: string[] = ['id', 'barCode', "fname", "lname", 'pawprint', "condition", "checkedOut", "dueDate", 'CheckIn'];

  computerForm;
  otherEquip;
  ngOnInit(): void {
    this.mbp2015 = [0,0];
    this.mbp2017 = [0,0];
    this.dell = [0,0];


    // console.log(this.afAuth.currentUser);

    this.mbp2015 = this.databaseService.getItemCount('Mid 2015 MacBook Pro');
    this.mbp2017 = this.databaseService.getItemCount('Mid 2017 MacBook Pro');
    this.dell = this.databaseService.getItemCount('Dell Latitude 5580');
    this.thingdoesthing = this.databaseService.getCheckedOutItems();

    this.thingdoesthing.subscribe(data => {
      this.itemsFromDatabase = data;
    });
   
    this.computerForm = this.fb.group({
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      releaseYear: new FormControl('', Validators.required),
      screenSize: new FormControl('', Validators.required),
      diskSpace: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
      barCode: new FormControl('', Validators.required),
  });

  this.otherEquip = this.fb.group({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    releaseYear: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
    barCode: new FormControl('', Validators.required),
});
  }
  selectedValue: string | undefined;

  addItemForm: Category[] = [
    { value: 'laptop', viewValue: 'Laptop' },
    { value: 'camera', viewValue: 'Camera' },
    { value: 'microphone', viewValue: 'Microphone' },
    { value: 'lights', viewValue: 'Lights' },
    { value: 'backdrops', viewValue: 'Backdrops' },
    { value: 'boom poles', viewValue: 'Boom Poles' },
    { value: 'cages', viewValue: 'Cages' },
    { value: 'clamps', viewValue: 'Clamps' },
    { value: 'follow focus', viewValue: 'Follow Focus' },
    { value: 'gimbals', viewValue: 'Gimbals' },
    { value: 'lenses', viewValue: 'Lenses' },
    { value: 'mixers', viewValue: 'Mixers' },
    { value: 'monitors', viewValue: 'Monitors' },
    { value: 'recorders', viewValue: 'Recorders' },
    { value: 'reflectors', viewValue: 'Reflectors' },
    { value: 'robotics', viewValue: 'Robotics' },
    { value: 'routers', viewValue: 'Routers' },
    { value: 'steady cams', viewValue: 'Steady Cams' },
    { value: 'time controls', viewValue: 'Time Controls' }

  ];

  computer = true;

  checkIn(barCode, condition, dueDate, orderNumber) {
    // this.databaseService.checkIn(item);
    this.dialog.open(UserDialogComponent, {
      data: {
        reason: 'checkIn',
        barCode: barCode, 
        condition: condition, 
        dueDate: dueDate,
        orderNumber: orderNumber
      }
    })
  }

  addComputer() {
    const brand = this.computerForm.get('brand').value;
    const model = this.computerForm.get('model').value;
    const releaseYear = this.computerForm.get('releaseYear').value;
    const screenSize = this.computerForm.get('screenSize').value;
    const diskSpace = this.computerForm.get('diskSpace').value;
    const condition = this.computerForm.get('condition').value;
    const barCode = this.computerForm.get('barCode').value;
    // this.databaseService.addItem(brand, model, releaseYear, screenSize, diskSpace, condition, barCode);
  }

  addOtherEquip() {
    const brand = this.otherEquip.get('brand').value;
    const model = this.otherEquip.get('model').value;
    const releaseYear = this.otherEquip.get('releaseYear').value;
    const condition = this.otherEquip.get('condition').value;
    const barCode = this.otherEquip.get('barCode').value;
    // this.databaseService.addOtherEquip(brand, model, releaseYear, condition, barCode);
  }

}
