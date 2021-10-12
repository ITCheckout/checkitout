import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      pawprintEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  //Login Form: https://www.youtube.com/watch?v=vAglCz1F96Y
  onLogin(){
    const {pawprint, password} = this.loginForm.value;
    const schoolEmail = pawprint + "@umsystem.edu";
    this.auth.createUserWithEmailAndPassword(schoolEmail, password).then (user => {
      console.log('RegisterCompnent -> createUser -> user', user)
      this.router.navigate([''])
    })
  }
}
