import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/userservices/profile.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data="";
  constructor(private profileService:ProfileService) { }
  ngOnInit(): void {
    this.profileService.test().subscribe(
      data => {
        this.data =data;
      },
      err => {
      });
  }
}
