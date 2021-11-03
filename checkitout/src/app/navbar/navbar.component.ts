import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate([''])

    this._snackBar.open('You have been logged out', '', {
      duration: 2500,
      panelClass: ['snackbar-success']
    });
  }
}
