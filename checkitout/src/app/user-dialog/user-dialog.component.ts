import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  //this will inject the data from the Dialog box (in the sign-up component.ts) to use in the html
  constructor(@Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit(): void {
  }

}
