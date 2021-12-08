import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private databaseService: DatabaseService) { }

  mbp2015 = [0,0];
  mbp2017 = [0,0];
  dell = [0,0];

  ngOnInit(): void {
    this.mbp2015 = [0,0];
    this.mbp2017 = [0,0];
    this.dell = [0,0];


    this.mbp2015 = this.databaseService.getItemCount('Mid 2015 MacBook Pro');
    this.mbp2017 = this.databaseService.getItemCount('Mid 2017 MacBook Pro');
    this.dell = this.databaseService.getItemCount('Dell Latitude 5580');
  }

}
