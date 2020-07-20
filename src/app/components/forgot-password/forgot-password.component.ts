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
  message ='';
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
        console.log(data)
        if(data.hasOwnProperty('MessageId')){
          this.error= false;
          this.message = "Request submitted successfully with request id : "+
           data.ResponseMetadata.RequestId+"\n"+", where message id : "+ data.MessageId;
        }
        else if(data.hasOwnProperty('message')){
          this.errorList = data
          this.error = true;
        }
          
      },
      err => {

      });
  }

}
