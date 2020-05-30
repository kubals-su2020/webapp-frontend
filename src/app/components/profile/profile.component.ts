import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/userservices/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile:any;
  showMyListing:boolean;
  constructor(private profileService:ProfileService) {
    this.showMyListing = true;
   }
  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      data => {
        this.profile =data;
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
  }
  decideTab(num) {
    if (num == 1)
      this.showMyListing = true;
    else if (num == 2)
      this.showMyListing = false;
  }
}
