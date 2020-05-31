import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequestCustomService } from '../../sharedservices/http-request-custom.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private apiService:HttpRequestCustomService) { }
  saveBook(bookDetails,seller):Observable<any>{
    let authors = [];
    let authorList = bookDetails.authors.split(",");
    for(let a in authorList){
      let author = { "author_name" : authorList[a]};
      authors.push(author) 
    }
    
    bookDetails.authors = authors;
    bookDetails.seller = seller;
    return this.apiService.post('/book' , {book : bookDetails})
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
