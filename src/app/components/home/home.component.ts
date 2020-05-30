import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showMyListing:boolean;
  constructor() {
    this.showMyListing = true;
   }

  ngOnInit(): void {
  }
  decideTab(num) {
    if (num == 1)
      this.showMyListing = true;
    else if (num == 2)
      this.showMyListing = false;
  }
}
