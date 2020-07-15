import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UI';
  constructor(private http: HttpClient){
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('ip:', data.ip);
      window.localStorage['access_token'] = data.ip;
    })
  }
}
