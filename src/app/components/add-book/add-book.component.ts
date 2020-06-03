import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from './../../services/userservices/book.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addForm: any;
  error = false;
  errorList;
  currentBook: any;
  hide= true;
  user;
  constructor(private bookService:BookService,private profileService:ProfileService,private router: Router) { 
    this.currentBook= { isbn: 11, title: 'ooDr Nice' ,price:10,published_date:new Date()};
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      isbn: new FormControl(""),
      title: new FormControl(""),
      price: new FormControl("",[Validators.max(9999.99), Validators.min(0.01)]),
      authors: new FormControl(""),
      quantity: new FormControl("",[Validators.max(999), Validators.min(0)]),
      published_date:new FormControl("")
    })
  }
  onSubmit() {
    this.profileService.getUser().subscribe(
      data => {
        this.user =data;
        this.bookService.saveBook(this.addForm.value,this.user)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });

  }

}
