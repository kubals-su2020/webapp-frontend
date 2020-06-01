import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/userservices/book.service';

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
  bookid;
  constructor(private router: Router,private route: ActivatedRoute,private bookService:BookService) {
    this.currentBook= null;
    this.bookid = null;
  }

  // Load settings page
  ngOnInit(): void {
    if (history.state.hasOwnProperty('book')) {
      this.currentBook = history.state.book;
      var date = new Date(this.currentBook.publication_date).toISOString();
      if (this.currentBook != null) {
        let authorsString =Array.prototype.map.call(this.currentBook.authors, s => s.author_name).toString();
        this.updateForm = new FormGroup({
          isbn: new FormControl(this.currentBook.isbn),
          title: new FormControl(this.currentBook.title),
          authors: new FormControl(authorsString),
          price: new FormControl(this.currentBook.price,[Validators.max(9999.99), Validators.min(0.01)]),
          quantity: new FormControl(this.currentBook.quantity,[Validators.max(999), Validators.min(0)]),
          published_date:new FormControl(date)
        })
      }
      else {
        this.router.navigate(['/addbook']);
      }
    }

    else {
      this.router.navigate(['/home']);
    }
    // this.route.paramMap.subscribe(params => {
    //   this.bookid = params.get('id')
    //   this.currentBook = history.state;

    // });


  }
  onSubmit() {
        this.bookService.updateBook(this.updateForm.value,this.currentBook.id)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
      }
}
