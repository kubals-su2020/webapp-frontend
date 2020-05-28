import { Component, OnInit, Input } from '@angular/core';

// Declaring component for error list
@Component({
  selector: 'app-format-error',
  templateUrl: './format-error.component.html',
  styleUrls: ['./format-error.component.scss']
})
export class FormatErrorComponent implements OnInit {
  @Input() errorList;
  errors;
  constructor() { 
    this.errors = null;
  }

  // format and display error from errorlist
  ngOnInit(): void {
    this.errors = this.errorList;
  }
}
