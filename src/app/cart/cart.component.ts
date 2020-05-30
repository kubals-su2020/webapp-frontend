import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart;
  constructor() {
    this.cart=[{ isbn: 16, title: 'RubberMan' ,price:1,published_date:new Date(),quantity:0},
    { isbn: 17, title: 'Dynama' ,price:3,published_date:new Date(),quantity:9},
    { isbn: 18, title: 'Dr IQ' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 19, title: 'Magma' ,price:10,published_date:new Date(),quantity:9},
    { isbn: 20, title: 'Tornado' ,price:10,published_date:new Date(),quantity:9}];
   }

  ngOnInit(): void {
  }

}
