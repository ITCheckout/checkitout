import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router, 
    private _snackBar: MatSnackBar, 
    private loginComponent: LoginComponent, 
    private cookieService: CookieService,
    private dialog: MatDialog) { }

  userRole;
  ngOnInit(): void {
    this.userRole = this.cookieService.get('userRole');
    if(!this.userRole){
      this.afAuth.signOut();
    }
  }


  logout(){
    this.afAuth.signOut();
    this.dialog.open(UserDialogComponent, {
      data: {
        formData: 'logout',
        thanks: "You have been signed Out"
      }
    })
    const snackBarRef = this._snackBar.open('You have been logged out', '', {
      duration: 2500,
      panelClass: ['snackbar-success'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
        this.cookieService.delete('userRole');
      });
    }
    );
  }
}
