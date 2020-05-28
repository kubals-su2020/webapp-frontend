import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservices/auth.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

// Declaring article for Settings page
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: any;
  error = false;
  errorList;
  currentUser: any;
  username = null;
  hide= true;
  // "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$"
  pwdPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
  constructor(private authService: AuthService, private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.username = null;
    this.currentUser = null;
  }

  // Load settings page
  ngOnInit(): void {
    this.settingsForm = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.pattern(this.pwdPattern)])
    })

  
    this.currentUser = {};
    this.profileService.getUser().subscribe(
      data => {
        this.currentUser.email = data.email;
        this.currentUser.first_name = data.first_name;
        this.currentUser.last_name =data.last_name;
        this.settingsForm = new FormGroup({
          firstName: new FormControl(this.currentUser.first_name),
          lastName: new FormControl(this.currentUser.last_name),
          email: new FormControl(this.currentUser.email,[Validators.required, Validators.email]),
          password: new FormControl("",[Validators.required, Validators.pattern(this.pwdPattern)])
        });
      },
      err => {
      });



  }
  onSubmit() {
      this.profileService.updateUser( this.settingsForm.value).subscribe(
        data => {
          this.router.navigate(['/profile']);
          //this.router.navigate(['/editor'],{state : data});
        },
        err => {
          this.errorList = err;
          this.error = true;
        });
  }
}
