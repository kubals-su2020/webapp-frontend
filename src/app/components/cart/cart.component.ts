import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CartService } from './../../services/userservices/cart.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList;
  buyer;
  itemCount ;
  totalAmount;
  errorList;
  success;
  constructor(public dialog: MatDialog,
    private cartService:CartService,
    private profileService:ProfileService) {
      this.itemCount = 0;
      this.totalAmount = 0;
  //   this.cart=[{ isbn: 16, title: 'RubberMan' ,price:1,published_date:new Date(),quantity:0},
  //   { isbn: 17, title: 'Dynama' ,price:3,published_date:new Date(),quantity:9},
  //   { isbn: 18, title: 'Dr IQ' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 19, title: 'Magma' ,price:10,published_date:new Date(),quantity:9},
  //   { isbn: 20, title: 'Tornado' ,price:10,published_date:new Date(),quantity:9}];
    }

  ngOnInit(): void {
    this.getCartItems();
    this.profileService.getUser().subscribe(
      data => {
        this.buyer =data;
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
  }
  
  getCartItems(){
    this.cartService.getCartDetails().subscribe(data=>{
      this.cartList = data;
      
      this.cartList.forEach(function(o) { 
        o.book.orderQuantity = o.quantity;
        o.book.authorsString =Array.prototype.map.call(o.book.authors, s => s.author_name).toString() });
        this.calculateCart();
      // console.log(this.cartList)
    },
    err=>{

    })
  }

  calculateCart(){
    this.itemCount = 0;
    this.totalAmount = 0;
    for(let c in this.cartList){
      this.itemCount++;
      this.totalAmount = this.totalAmount + this.cartList[c].book.price*this.cartList[c].quantity;
    }
  }
  addToCart(book){
    if(book.quantity>book.orderQuantity){
      book.orderQuantity ++;
      // console.log(book)
      this.cartService.updateCart(book,this.buyer).subscribe(cart=>{
        this.getCartItems();
      },
      err=>{

      })
    }
  }
  removeFromCart(book){
    if(book.orderQuantity>0){
      book.orderQuantity --;
      this.cartService.updateCart(book,this.buyer).subscribe(cart=>{
        this.getCartItems();
      },
      err=>{

      })
    }
  }
  openDialog(errorList) {
    // console.log(errorList)
    const dialogRef = this.dialog.open(DialogContentExampleDialog1,{
      data: {
        error: errorList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }


  openDialogSuccess() {
    const dialogRef = this.dialog.open(SuccessDialog);
    this.getCartItems();
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  submitCart(){
    this.cartService.submitCart(this.cartList,this.buyer).subscribe(
      data => {
        // console.log(data)
        if(data.hasOwnProperty('message')&&data.message.hasOwnProperty('error')){
            this.errorList = data.message.error;
            this.openDialog(this.errorList);
        }
        if(data.hasOwnProperty('message')&&data.message.hasOwnProperty('success')){
          this.success = data.message.success;
          this.openDialogSuccess();
        }
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
  }

}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog1 {
  fromPage;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.fromPage = data.error
  }
}


@Component({
  selector: 'success-dialog',
  templateUrl: 'success-dialog.html',
})

export class SuccessDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}