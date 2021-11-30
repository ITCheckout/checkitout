import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var loggedIn;;
      this.afAuth.authState.subscribe(user => {
        if(user) {
          loggedIn = true;
        } else {
          loggedIn = false;
        }
      });

    if(loggedIn) {
      return true;
    }
    return false;
  }
  
}
