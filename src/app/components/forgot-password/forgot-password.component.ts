import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "../../services/authservices/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  error = false;
  errorList;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    })
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  // Authenticate user and sign-in
  onSubmit() {
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      data => {
       
      },
      err => {

      });
  }

}
