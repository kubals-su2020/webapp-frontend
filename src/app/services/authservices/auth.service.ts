import { Injectable } from '@angular/core';
import { apiconfig } from '../../config/apiconfig';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../../models/User';
import { HttpRequestCustomService } from '../../sharedservices/http-request-custom.service';

import { JwtTokenService } from "../../sharedservices/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); 
  constructor( public router: Router,private apiService:HttpRequestCustomService,private jwtService:JwtTokenService) { 
  }
signUp(userDetails):Observable<any>{
  return this.apiService.post('/users' , {user : userDetails})
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
}
  signIn(userDetails: User) {
    return this.apiService.post('/user' , {user : userDetails})
    .pipe(
      map((res: Response) => {
        this.loggedIn.next(true);
         this.jwtService.saveToken(res);
        return res || {}
      }),
      catchError(this.errorHandl));
   }
  // Error handling
  errorHandl(error:any) {
    return throwError(error);
  }
  get isLoggedIn() {
    if(localStorage.getItem('access_token')){
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable(); 
  }
  logoutCleanUpTasks(){
    let removeToken = localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  logout():Observable<any>{
    return this.apiService.post('/logout' , {})
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
      catchError(this.errorHandl));
  }
  setLogout(){
    let removeToken = this.logoutCleanUpTasks();
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }
  forgotPassword(userDetails):Observable<any>{
    return this.apiService.post('/resetpassword' , {user : userDetails})
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
}
