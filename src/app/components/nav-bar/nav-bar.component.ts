import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/authservices/auth.service";
import { Observable } from 'rxjs';
import { CartService } from './../../services/userservices/cart.service';

import { User } from 'src/app/models/User';
import { FormGroup, FormBuilder } from '@angular/forms';

// Declaring component for nav-bar
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  Navbarlinks = [
    { path: 'signin', label: 'Sign in' },
    { path: 'signup', label: 'Sign up' }];

  LoggedInNavbarlinks = [
    { path: 'home', label: 'Home' },
    { path: 'profile', label: 'Profile' }
  ];
  links;
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  cartList = [];


  constructor(private authService: AuthService, 
    private fb: FormBuilder,
    private cartService:CartService) {
    this.links = this.Navbarlinks;
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  pullCart(){
    this.cartService.getCart().subscribe(cart=>{
      this.cartList = cart;
    },
    err=>{

    })
  }
    // Function for logout 
    logout() {
      // console.log("logout service")
      this.authService.logout().subscribe(data=>{
        // console.log(data)
        this.authService.setLogout();
      },
      err=>{
        console.log(err)
      });
    }
}
