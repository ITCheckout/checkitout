import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user';
import { __awaiter } from 'tslib';

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
    isAdmin;
    user: User;

    //This function creates a promise (that will be resolved when the user's role is found)
    //This is needed because this function needs to run first, then the Firebase Authentication can run only AFTER the promise is resolved
    async getRole() {
      return  new Promise(async (resolve, reject) => {
        const {pawprint, password} = this.loginForm.value;
        this.usersService.getUser(pawprint).subscribe(async user => {
          userRole: user;
          this.userRole = user;
          //do once the promise is resolved
          resolve("success");
        })

        }).then(() => {
            this.onLogin();
        }
        
 
      )
    }
    async onLogin(){
      this.loginError = "";

      if(this.loginForm.valid){
        //return a promise to wait for the user's role to be found
          const {pawprint, password} = this.loginForm.value;
        const schoolEmail = pawprint + "@umsystem.edu";
        const auth = getAuth();

        signInWithEmailAndPassword(auth,schoolEmail, password).then(async (result) => {
          //if the email is verfiied, then the user can login
          if(result.user.emailVerified !== true){
            this.loginError = "Please validate your email address before logging in.";
            //break from function
            return;
          }
         const dateNow = new Date();
         dateNow.setMinutes(dateNow.getMinutes() + 60);

     //wait to set cookie until the user's role is found
            if(this.userRole.role === "admin"){
              localStorage.setItem('adminPass', 'true');
            }
   
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }).catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
            case "auth/user-not-found":
            {
               this.loginError = "Wrong username or password.";
               break;
            }
            default:
            {
                this.loginError = "Unexpected Error";

                break;
            }
       }
        });
      }else {
        this.loginError = "Please fill pawprint and password fields.";
      }
    }

    handleKeyUp(event) {
      if (event.keyCode === 13) {
        this.getRole();
        this.getRole();
      }
    }

    redirectTo(uri:string){}
}
