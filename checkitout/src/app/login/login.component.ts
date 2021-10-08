import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = new FormGroup({
    pawprint: new FormControl(''),
    password: new FormControl(''),
  });
  pawprint = new FormControl('');

  constructor(private formBuilder: FormBuilder,) { }


  ngOnInit(): void {

  }

}
