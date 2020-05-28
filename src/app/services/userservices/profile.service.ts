import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpRequestCustomService } from '../../sharedservices/http-request-custom.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService:HttpRequestCustomService) { }
  getUser(): Observable<any> {
    return this.apiService.get('/user')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }
  updateUser(userDetails):Observable<any>{
    return this.apiService.put('/user', { user: userDetails })
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
