import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  updateForm: any;
  error = false;
  errorList;
  currentBook: any;
  hide= true;
  constructor() {
    this.currentBook= { isbn: 11, title: 'ooDr Nice' ,price:10,published_date:new Date()};
  }

  // Load settings page
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      isbn: new FormControl(""),
      title: new FormControl(""),
      price: new FormControl("",[Validators.max(9999.99), Validators.min(0.01)]),
      quantity: new FormControl("",[Validators.max(999), Validators.min(0)]),
      published_date:new FormControl("")
    })
  }
  onSubmit() {

  }
}
