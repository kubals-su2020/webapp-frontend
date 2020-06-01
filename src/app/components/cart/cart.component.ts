import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CartService } from './../../services/userservices/cart.service';
import { ProfileService } from '../../services/userservices/profile.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList;
  buyer;
  constructor(public dialog: MatDialog,
    private cartService:CartService,
    private profileService:ProfileService) {
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
      
      this.cartList.forEach(function(o) { o.book.orderQuantity = o.quantity });
      
      console.log(this.cartList)
    },
    err=>{

    })
  }


  addToCart(book){
    if(book.quantity>book.orderQuantity){
      book.orderQuantity ++;
      console.log(book)
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