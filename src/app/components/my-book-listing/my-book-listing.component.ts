import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BookService } from './../../services/userservices/book.service';

@Component({
  selector: 'app-my-book-listing',
  templateUrl: './my-book-listing.component.html',
  styleUrls: ['./my-book-listing.component.scss']
})
export class MyBookListingComponent implements OnInit {
  sortedListOfBooks =[];
  listOfBooks =[];
  //  listOfBooks = [
  //   { isbn: 11, title: 'Dr Nice' ,price:3,published_date:new Date(),quantity:0},
  //   { isbn: 12, title: 'Narco',price:10,published_date:new Date(),quantity:19 },
  //   { isbn: 13, title: 'Bombasto' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 14, title: 'Celeritas' ,price:10,published_date:new Date(),quantity:8},
  //   { isbn: 15, title: 'Magneta' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 16, title: 'RubberMan' ,price:1,published_date:new Date(),quantity:0},
  //   { isbn: 17, title: 'Dynama' ,price:3,published_date:new Date(),quantity:9},
  //   { isbn: 18, title: 'Dr IQ' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 19, title: 'Magma' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 20, title: 'Tornado' ,price:10,published_date:new Date(),quantity:9}
  // ];
  constructor(public dialog: MatDialog,private bookService:BookService) {
    
   }
  
  ngOnInit(): void {
    // console.log(this.listOfBooks)
    // this.sortedListOfBooks = this.listOfBooks.sort((a, b) => a.price - b.price);
    this.getListOfMyBooks();
    
  }
  openDialog(book) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.bookService.deleteBook(book).subscribe(
          data => {
            console.log(data)
            this.getListOfMyBooks();
          },
          err => {
            // this.errorList = err;
            // this.error = true;
          });
        
      }
    });
  }
  getListOfMyBooks(){
    this.bookService.getMyBooks().subscribe(
      data => {
        console.log(data)
        this.listOfBooks =data;
        this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
  }
  sortFunc(a, b) {
    console.log("in sort")
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
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog {}