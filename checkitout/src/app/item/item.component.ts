import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) { }

  itemDoc;
  ngOnInit(): void {
    const itemName = this.route.snapshot.paramMap.get('model');
    console.log(itemName);
    this.databaseService.getModel(itemName).subscribe(data => {
      console.log(data[0]);
      this.itemDoc = data[0];
    });
  }

}
