import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router, private usersService: UsersService) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      pawprint: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  get pawprint() {return this.loginForm.get('pawprint')}
  get password() {return this.loginForm.get('password')}


    //Login Form: https://www.youtube.com/watch?v=vAglCz1F96Y
    loginError = '';
    userRole;
    user: User;
    onLogin(){
      this.loginError = "";
      if(this.loginForm.valid){
        const {pawprint, password} = this.loginForm.value;
        this.usersService.getUser(pawprint).subscribe(user => {
          this.userRole = user;
        })
        const schoolEmail = pawprint + "@umsystem.edu";
        const auth = getAuth();
        signInWithEmailAndPassword(auth,schoolEmail, password).then(userCredential => {
         const user = userCredential.user;
         localStorage.setItem('userRole', this.userRole.role);
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }).catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
            case "auth/user-not-found":
            {
               this.loginError = "Wrong email address or password.";
               break;
            }
               default:
            {
                this.loginError = "Unexpected Error";
                break;
            }
       }
        });
      }
  
    }
}
