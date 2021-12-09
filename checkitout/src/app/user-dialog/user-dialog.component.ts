import { ConditionalExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { DatePipe } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  providers: [DatePipe]
})
export class UserDialogComponent implements OnInit {

  notesFromDB;

  //this will inject the data from the Dialog box (in the sign-up component.ts) to use in the html
  constructor
  ( private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public formData, private databaseService: DatabaseService, private datePipe: DatePipe, private _snackBar: MatSnackBar) { }

  checkInForm: FormGroup;
  ngOnInit(): void {
    this.checkInForm = this.fb.group({
      condition: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      newNote: new FormControl('')
    });
    if(this.formData.reason=='checkIn'){
        var query = this.databaseService.getNotes(this.formData.barCode);
        query.subscribe(data => {
          this.notesFromDB = data.notes;
        });
    }

  }

  clearForm() {
    window.location.reload();
  }

  checkIn
  checkInItem(newNoteValue) {
    const turnInDate = this.datePipe.transform(this.checkInForm.value.dueDate, 'longDate', 'CST');

    if (this.checkInForm.valid) {
      this.databaseService.checkInItem(this.formData.barCode, this.checkInForm.value.condition, turnInDate, newNoteValue, this.formData.orderNumber);
      this._snackBar.open("Item Check In Successful", 'OK', {
        duration: 5000,
      });
    } else {
      this._snackBar.open("Cannot process check in. Please check form and try again.", 'OK', {
        duration: 5000,
      });
    }

    
  }

}
