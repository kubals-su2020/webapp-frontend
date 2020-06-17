import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/userservices/book.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-view-book-images',
  templateUrl: './view-book-images.component.html',
  styleUrls: ['./view-book-images.component.scss']
})
export class ViewBookImagesComponent implements OnInit {
  currentBook;
  imageurl;
  imageurls=[];

  constructor(private bookService:BookService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (history.state.hasOwnProperty('book')) {
      this.currentBook = history.state.book;
      // console.log(this.currentBook)
      this.getImages(this.currentBook.id)
    }
  }
  
  getImages(bookId):void{
    this.bookService.getImages(bookId).subscribe(
      data => {

        for(let d in data){
          // console.log(data[d])
          // this._arrayBufferToBase64(data[0].Body.data);
          let TYPED_ARRAY = new Uint8Array(data[d].Body.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
          let base64String = btoa(STRING_CHAR);
          this.imageurl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
          this.imageurls.push(this.imageurl)
        //  console.log(this.imageurls)

        }

      },
      err => {
        console.log(err)
      });
  }
}
