import { Component, OnInit } from '@angular/core';
import { BookService } from './../../services/userservices/book.service';

@Component({
  selector: 'app-others-book-listing',
  templateUrl: './others-book-listing.component.html',
  styleUrls: ['./others-book-listing.component.scss']
})
export class OthersBookListingComponent implements OnInit {
    listOfBooks;
  // listOfBooks = [
  //   { isbn: 11, title: 'ooDr Nice' ,price:10,published_date:new Date(),quantity:10},
  //   { isbn: 12, title: 'ooNarco',price:10,published_date:new Date(),quantity:0 },
  //   { isbn: 13, title: 'ooBombasto' ,price:10,published_date:new Date(),quantity:11},
  //   { isbn: 14, title: 'ooCeleritas' ,price:10,published_date:new Date(),quantity:5},
  //   { isbn: 15, title: 'ooMagneta' ,price:10,published_date:new Date(),quantity:10},
  //   { isbn: 16, title: 'ooRubberMan' ,price:1,published_date:new Date(),quantity:10},
  //   { isbn: 17, title: 'ooDynama' ,price:1,published_date:new Date(),quantity:10},
  //   { isbn: 18, title: 'ooDr IQ' ,price:2,published_date:new Date(),quantity:10},
  //   { isbn: 19, title: 'ooMagma' ,price:4,published_date:new Date(),quantity:10},
  //   { isbn: 20, title: 'oosTornado' ,price:10,published_date:new Date(),quantity:10}
  // ];
  sortedListOfBooks =[];
  constructor(private bookService:BookService) {
    
   }
  
  ngOnInit(): void {

    this.getListOfOthersBooks()
  }

  getListOfOthersBooks(){
    this.bookService.getOthersBooks().subscribe(
      data => {
        this.listOfBooks =data;
        this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
  }
  sortFunc(a, b) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    if(a.price ==  b.price){
      if ( a.quantity < b.quantity ){
        return -1;
      }
      if ( a.quantity > b.quantity ){
        return 1;
      }
      return 0;
    }
    return 0;
  }
}
