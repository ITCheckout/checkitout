import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { LoginComponent } from '../login/login.component';
import { CartService } from '../services/cart.service';
import { UsersService } from '../shared/users.service';
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
    private dialog: MatDialog,
    private cartService: CartService,
    private userService: UsersService){
    }

  userRole;
  itemsInCart;
  isAdmin;
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('adminPass');
  }



  logout(){
    this.afAuth.signOut();
    this.dialog.open(UserDialogComponent, {
      data: {
        reason: 'logout',
        thanks: "You have been signed Out"
      }
    })
    const snackBarRef = this._snackBar.open('You have been logged out', '', {
      duration: 2500,
      panelClass: ['snackbar-success'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['']).then(() => {
        localStorage.removeItem('adminPass');
        window.location.reload();
      });
    }
    );
  }
}
