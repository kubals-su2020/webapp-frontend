import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from './../../services/userservices/book.service';
import { ProfileService } from '../../services/userservices/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  addForm: any;
  error = false;
  errorList;
  currentBook: any;
  hide= true;
  user;
  images= [];
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  dataOfImages:any[]=[];
  constructor(private bookService:BookService,private profileService:ProfileService,private router: Router) { 
    this.currentBook= { isbn: 11, title: 'ooDr Nice' ,price:10,published_date:new Date()};
  }

  ngOnInit(): void {
    
    this.addForm = new FormGroup({
      isbn: new FormControl(""),
      title: new FormControl(""),
      price: new FormControl("",[Validators.max(9999.99), Validators.min(0.01)]),
      authors: new FormControl(""),
      quantity: new FormControl("",[Validators.max(999), Validators.min(0)]),
      published_date:new FormControl(""),
      file: new FormControl(''),
    })
  }
  onSubmit() {
    // console.log(this.fileList)
    this.profileService.getUser().subscribe(
      data => {
        this.user =data;
        
        this.bookService.saveBook(this.addForm.value,this.user,this.dataOfImages,this.fileList)
        .subscribe(
          data => {
            // console.log(data)
            this.router.navigate(['/home']);
          },
          err => {
            this.errorList = err;
            this.error = true;
          });
      },
      err => {
        // this.errorList = err;
        // this.error = true;
      });

  }

  get f(){
    return this.addForm.controls;
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
                   this.addForm.patchValue({
                      fileSource: this.images
                   });
                }
                 reader.readAsDataURL(event.target.files[i]);
    }
  }
  removeSelectedFile(index) {
    // Delete the item from fileNames list
    // this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
    this.images.splice(index,1);
    this.dataOfImages.splice(index,1);
   }
}
