import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequestCustomService } from '../../sharedservices/http-request-custom.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private apiService:HttpRequestCustomService) { }
  saveBook(bookDetails,seller,imageData,fileList):Observable<any>{
    let authors = [];
    let authorList = bookDetails.authors.split(",");
    for(let a in authorList){
      let author = { "author_name" : authorList[a]};
      authors.push(author) 
    }
    
    bookDetails.authors = authors;
    bookDetails.seller = seller;
    bookDetails.imageData = imageData;
    bookDetails.fileList = fileList;
    // console.log(bookDetails.imageData[0].metadata)
    return this.apiService.post('/book' , {book : bookDetails})
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  getMyBooks(): Observable<any> {
    return this.apiService.get('/books/seller')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }
  getOthersBooks(): Observable<any> {
    return this.apiService.get('/books/others')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),

        catchError(this.errorHandl));
  }
  deleteBook(book): Observable<any> {
    // console.log(book)
    return this.apiService.delete('/books/seller/'+book.id)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  updateBook(bookDetails,bookid,imageData,fileList,seller_id):Observable<any>{
    // console.log(bookDetails)
    let authors = [];
    let authorList = bookDetails.authors.split(",");
    for(let a in authorList){
      let author = { "author_name" : authorList[a]};
      authors.push(author) 
    }
    
    bookDetails.authors = authors;
    bookDetails.id = bookid;
    bookDetails.imageData = imageData;
    bookDetails.fileList = fileList;
    bookDetails.sellerId= seller_id
    return this.apiService.put('/books/seller/'+bookid, { book: bookDetails })
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorHandl));
  }
  getImages(bookId):Observable<any>{
    return this.apiService.get('/book/'+bookId+'/images')
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorHandl));
  }
  deleteImage(imageName):Observable<any>{
    return this.apiService.delete('/image/'+imageName)
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
