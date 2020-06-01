import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequestCustomService } from '../../sharedservices/http-request-custom.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiService:HttpRequestCustomService) { }
  getCart(): Observable<any> {
    return this.apiService.get('/cart')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }
  getCartDetails(): Observable<any> {
    return this.apiService.get('/cart/details')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }
  updateCart(bookDetails,buyer): Observable<any> {
    let data = {
      book:bookDetails,
      buyer:buyer,
      quantity: bookDetails.orderQuantity
    }
    // console.log(data)
    return this.apiService.put('/cart',data)
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
  }
  errorHandl(error: any) {
    return throwError(error);
  }
}
