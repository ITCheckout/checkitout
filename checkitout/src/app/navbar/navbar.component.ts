import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar, private loginComponent: LoginComponent) { }

  userRole;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    console.log(this.userRole);
  }


  logout(){
    this.afAuth.signOut();
    const snackBarRef = this._snackBar.open('You have been logged out', '', {
      duration: 2500,
      panelClass: ['snackbar-success'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
      this.router.navigate(['']).then(() => {
        window.location.reload();
        localStorage.removeItem('userRole');
      });
    }
    );
  }
}
