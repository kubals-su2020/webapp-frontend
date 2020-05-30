import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others-book-listing',
  templateUrl: './others-book-listing.component.html',
  styleUrls: ['./others-book-listing.component.scss']
})
export class OthersBookListingComponent implements OnInit {

  listOfBooks = [
    { isbn: 11, title: 'ooDr Nice' ,price:10,published_date:new Date()},
    { isbn: 12, title: 'ooNarco',price:10,published_date:new Date() },
    { isbn: 13, title: 'ooBombasto' ,price:10,published_date:new Date()},
    { isbn: 14, title: 'ooCeleritas' ,price:10,published_date:new Date()},
    { isbn: 15, title: 'ooMagneta' ,price:10,published_date:new Date()},
    { isbn: 16, title: 'ooRubberMan' ,price:10,published_date:new Date()},
    { isbn: 17, title: 'ooDynama' ,price:10,published_date:new Date()},
    { isbn: 18, title: 'ooDr IQ' ,price:10,published_date:new Date()},
    { isbn: 19, title: 'ooMagma' ,price:10,published_date:new Date()},
    { isbn: 20, title: 'oosTornado' ,price:10,published_date:new Date()}
  ];
  constructor() {
    
   }
  
  ngOnInit(): void {
    console.log(this.listOfBooks)
    // this.getListOfMyBooks()
  }

  getListOfMyBooks(){

  }

}
