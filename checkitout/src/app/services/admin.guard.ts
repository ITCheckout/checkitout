import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAdmin = localStorage.getItem('adminPass')
      var loggedIn;
      //this promise is used to check if the user is logged in or not
      return new Promise((resolve, reject) => {
        this.afAuth.authState.subscribe(user => {
          //if there is a user logged in, we resolve it and set the canActivate to true
          if (isAdmin == 'true') {
            loggedIn = true;
            resolve(true);
          } else {
            loggedIn = false;
            this.router.navigate(['']);
            resolve(false);
          }
        });
        if(loggedIn) {
          return true;
        }
        return false;
      });
  }
  
}
