import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-my-book-listing',
  templateUrl: './my-book-listing.component.html',
  styleUrls: ['./my-book-listing.component.scss']
})
export class MyBookListingComponent implements OnInit {
  sortedListOfBooks =[];
   listOfBooks = [
    { isbn: 11, title: 'Dr Nice' ,price:3,published_date:new Date(),quantity:0},
    { isbn: 12, title: 'Narco',price:10,published_date:new Date(),quantity:19 },
    { isbn: 13, title: 'Bombasto' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 14, title: 'Celeritas' ,price:10,published_date:new Date(),quantity:8},
    { isbn: 15, title: 'Magneta' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 16, title: 'RubberMan' ,price:1,published_date:new Date(),quantity:0},
    { isbn: 17, title: 'Dynama' ,price:3,published_date:new Date(),quantity:9},
    { isbn: 18, title: 'Dr IQ' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 19, title: 'Magma' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 20, title: 'Tornado' ,price:10,published_date:new Date(),quantity:9}
  ];
  constructor(public dialog: MatDialog) {
    
   }
  
  ngOnInit(): void {
    console.log(this.listOfBooks)
    // this.sortedListOfBooks = this.listOfBooks.sort((a, b) => a.price - b.price);
    // this.getListOfMyBooks()
    this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getListOfMyBooks(){

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