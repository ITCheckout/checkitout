import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { environment } from 'src/environments/environment';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollingModule } from '@angular/cdk/scrolling';

/* Firebase imports */
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { ItemComponent } from './item/item.component';
import { UsersService } from './shared/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { AdminFacingComponent } from './admin-facing/admin-facing.component';
import { CookieService } from 'ngx-cookie-service';
import { ResetComponent } from './reset/reset.component';
import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    HomeComponent,
    CheckoutComponent,
    SignUpComponent,
    UserDialogComponent,
    ItemComponent,
    AboutComponent,
    CartComponent,
    AdminFacingComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    RouterModule.forRoot([
      { path: 'reset', component: ResetComponent },
      { path: 'admin', component: AdminFacingComponent, canActivate: [AdminGuard] },
      { path: 'cart', component: CartComponent },
      { path: 'checkout/:model', component: ItemComponent },
      { path: 'about', component: AboutComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignUpComponent },
      { path: '', component: HomeComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [UsersService, LoginComponent, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule {

}