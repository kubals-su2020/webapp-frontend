import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart;
  constructor(public dialog: MatDialog) {
    this.cart=[{ isbn: 16, title: 'RubberMan' ,price:1,published_date:new Date(),quantity:0},
    { isbn: 17, title: 'Dynama' ,price:3,published_date:new Date(),quantity:9},
    { isbn: 18, title: 'Dr IQ' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 19, title: 'Magma' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 20, title: 'Tornado' ,price:10,published_date:new Date(),quantity:9}];
   }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog1);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog1 {}