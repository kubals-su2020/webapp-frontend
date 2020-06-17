import { Component, OnInit } from '@angular/core';
import { BookService } from './../../services/userservices/book.service';
import { CartService } from './../../services/userservices/cart.service';
import { ProfileService } from '../../services/userservices/profile.service';
@Component({
  selector: 'app-others-book-listing',
  templateUrl: './others-book-listing.component.html',
  styleUrls: ['./others-book-listing.component.scss']
})
export class OthersBookListingComponent implements OnInit {
    listOfBooks;
    cartList;
    cart = [];
    buyer;
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
  constructor(private bookService:BookService,
     private cartService:CartService,
     private profileService:ProfileService) {
    
   }
  
  ngOnInit(): void {

    this.getListOfOthersBooks()
  }

  getListOfOthersBooks(){
    this.bookService.getOthersBooks().subscribe(
      data => {
        this.listOfBooks =data;
        //  console.log(this.listOfBooks)
        this.listOfBooks.forEach(function(o) { 
          o.orderQuantity = 0;
          o.authorsString =Array.prototype.map.call(o.authors, s => s.author_name).toString() });
        this.cartService.getCart().subscribe(cart=>{
          this.cartList = cart;
          for(let c in this.cartList){
            this.filterValue(this.listOfBooks,"id",this.cartList[c].book_id,this.cartList[c].quantity);
            
          }
          this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
        },
        err=>{

        })
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });
      
      this.profileService.getUser().subscribe(
        data => {
          this.buyer =data;
        },
        err => {
          // this.errorList = err;
          // this.error = true;
        });
  }
  filterValue = (obj, key, value,orderQuantity)=> obj.find(v =>{ 
    if(v[key] === value){
        v["orderQuantity"] = orderQuantity;
        return v;
    }
  });
  
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
  addToCart(book){
    if(book.quantity>book.orderQuantity){
      book.orderQuantity ++;
      this.cartService.updateCart(book,this.buyer).subscribe(cart=>{
        this.cartList = cart;
        for(let c in this.cartList){
          this.filterValue(this.listOfBooks,"id",this.cartList[c].book_id,this.cartList[c].quantity);
          this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
        }
      },
      err=>{

      })
    }
  }
  removeFromCart(book){
    if(book.orderQuantity>0){
      book.orderQuantity --;
      this.cartService.updateCart(book,this.buyer).subscribe(cart=>{
        this.cartList = cart;
        for(let c in this.cartList){
          this.filterValue(this.listOfBooks,"id",this.cartList[c].book_id,this.cartList[c].quantity);
          this.sortedListOfBooks= this.listOfBooks.sort(this.sortFunc)
        }
      },
      err=>{

      })
    }
  }
}
