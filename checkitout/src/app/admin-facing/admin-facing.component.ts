import { Component, OnInit } from '@angular/core';
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



  constructor() { }

  ngOnInit(): void {
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
