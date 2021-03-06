import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private auth: AngularFireAuth,
    private dialog: MatDialog,
    private router: Router) {

    this.resetForm = this.fb.group({
      pawprint: new FormControl('', Validators.required)
    });
   }
   get pawprint() {return this.resetForm.get('pawprint')}

  ngOnInit(): void {
  }
  loginError;
  reset() {
    if(this.resetForm.valid) {
      const pawprint = this.resetForm.value.pawprint;
      // console.log(this.resetForm.value);
      const schoolEmail = pawprint + "@umsystem.edu";
      this.auth.sendPasswordResetEmail(schoolEmail).then(() => {
        this.dialog.open(UserDialogComponent, {
          data: {
            reason: "reset",
            formData: this.resetForm.value,
            schoolEmail: schoolEmail,
            thanks: "A password reset email has been sent to " + schoolEmail + "."
          }
        });
    }
    );
    this.router.navigate(['/login']);
    }else {
      this.loginError = "Please enter a valid pawprint."
    }

  }
}
