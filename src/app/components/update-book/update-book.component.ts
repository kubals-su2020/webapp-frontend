import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/userservices/book.service';

import {MatDialog} from '@angular/material/dialog';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  updateForm: any;
  error = false;
  errorList;
  currentBook: any;
  hide= true;
  bookid;
  imageurls=[];
  fileList =[];
  images=[];
  dataOfImages = [];
  constructor(private router: Router
    ,private route: ActivatedRoute
    ,private bookService:BookService
    ,private domSanitizer: DomSanitizer
    ,public dialog: MatDialog) {
    this.currentBook= null;
    this.bookid = null;
  }

  // Load settings page
  ngOnInit(): void {
    // console.log(history.state.book)
    if (history.state.hasOwnProperty('book')) {
      this.currentBook = history.state.book;
      // console.log(this.currentBook)
      this.getImages(this.currentBook.id);
      var date = new Date(this.currentBook.publication_date).toISOString();
      if (this.currentBook != null) {
        let authorsString =Array.prototype.map.call(this.currentBook.authors, s => s.author_name).toString();
        this.updateForm = new FormGroup({
          isbn: new FormControl(this.currentBook.isbn),
          title: new FormControl(this.currentBook.title),
          authors: new FormControl(authorsString),
          price: new FormControl(this.currentBook.price,[Validators.max(9999.99), Validators.min(0.01)]),
          quantity: new FormControl(this.currentBook.quantity,[Validators.max(999), Validators.min(0)]),
          published_date:new FormControl(date),
          file: new FormControl(''),
        })
      }
      else {
        this.router.navigate(['/addbook']);
      }
    }

    else {
      this.router.navigate(['/home']);
    }
    // this.route.paramMap.subscribe(params => {
    //   this.bookid = params.get('id')
    //   this.currentBook = history.state;

    // });


  }
  onSubmit() {
        this.bookService.updateBook(this.updateForm.value,this.currentBook.id,this.dataOfImages,this.fileList,this.currentBook.seller_id)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
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
              let imageurl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
              let imagename = data[d].name;
              this.imageurls.push({
                imageUrl :imageurl,
                imageName:imagename
              })
            //  console.log(this.imageurls)
    
            }
    
          },
          err => {
            console.log(err)
          });
      }



      get f(){
        return this.updateForm.controls;
      }
       
      onFileChange(event) {
            for (let i = 0; i < event.target.files.length; i++) {
                    var selectedFile = event.target.files[i];
                    this.fileList.push(selectedFile);
                    var reader = new FileReader();
                    reader.onload = (event2:any) => {
                       this.images.push(event2.target.result); 
                      //  console.log(event2.target.result)
                      let metadata ={
                        name:selectedFile.name,
                        type:selectedFile.type,
                        size:selectedFile.size,
                        modifiedDate :selectedFile.lastModifiedDate
                      }
                      let fileReader: FileReader = new FileReader();
                      fileReader.onloadend = (e)=>{
                        var arrayBuffer = fileReader.result[0];
                        var bytes = new Int8Array(arrayBuffer);
                        let imgData = {
                          metadata: metadata,
                          // image :fileReader.result
                          image:event2.target.result
                        }
                        this.dataOfImages.push(imgData);
                      }
                      fileReader.readAsText(event.target.files[i]);
                       this.updateForm.patchValue({
                          fileSource: this.images
                       });
                    }
                     reader.readAsDataURL(event.target.files[i]);
        }
        // console.log(this.fileList);
        // console.log(this.images);
        // console.log(this.dataOfImages)
      }
      removeSelectedFile(index) {
        // Delete the item from fileNames list
        // this.listOfFiles.splice(index, 1);
        // delete file from FileList
        this.fileList.splice(index, 1);
        this.images.splice(index,1);
        this.dataOfImages.splice(index,1);
       }
      //  removeExisting(image){
      //    console.log(image)
      //  }


       openDialog(image,index) {
        const dialogRef = this.dialog.open(DialogContentExampleDialog3);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            // console.log(image)
            this.bookService.deleteImage(image.imageName).subscribe(
              data => {
                this.imageurls.splice(index,1);
                // this.getImages(this.currentBook.id);
              },
              err => {
                // this.errorList = err;
                // this.error = true;
              });
            
          }
        });
      }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog3 {}