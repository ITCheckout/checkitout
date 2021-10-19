import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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


/* Firebase imports */
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { ItemComponent } from './item/item.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UsersService } from './shared/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';


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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'cart', component: CartComponent },
      { path: 'item', component: ItemComponent },
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
  providers: [UsersService],
  bootstrap: [AppComponent]
})

export class AppModule {

}