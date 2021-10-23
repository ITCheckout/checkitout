import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmedValidator } from '../confirm-password';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /* null insertions: https://stackoverflow.com/questions/54104187/typescript-complain-has-no-initializer-and-is-not-definitely-assigned-in-the-co */
  signUpForm!: FormGroup
  constructor(
    private fb: FormBuilder, 
    private auth: AngularFireAuth, 
    private router: Router, 
    private userService: UsersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      pawprint: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      //custom validator imported from confirm-password.ts
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  get fname() {return this.signUpForm.get('fname')}
  get lname() {return this.signUpForm.get('lname')}
  get pawprint() {return this.signUpForm.get('pawprint')}
  get password() {return this.signUpForm.get('password')}
  get confirmPassword() {return this.signUpForm.get('confirmPassword')}
  get f(){return this.signUpForm.controls;}

  //Will create the user by getting the pawprint, concat. w/ @umsystem, and sending user back to home page
  createUser() {
    if(this.signUpForm.valid){
      const {pawprint, password} = this.signUpForm.value;
      const schoolEmail = pawprint + "@umsystem.edu";
      this.auth.createUserWithEmailAndPassword(schoolEmail, password).then (user => {
        this.auth.signOut();
        // console.log('RegisterCompnent -> createUser -> user', user)
        this.router.navigate([''])
      })
  
      // this will get the data from the signUpForm and pass it to the userService's 'createUser' method
      let data = this.signUpForm.value;
      // console.log(data);
      this.userService.createUser(data)
        this.dialog.open(UserDialogComponent, {
          data: {
            formData: this.signUpForm.value,
            thanks: "Thank you!"
          }
        })
    }
  }
  //Dialog reference: https://www.techiediaries.com/angular-material-dialogs/

}
