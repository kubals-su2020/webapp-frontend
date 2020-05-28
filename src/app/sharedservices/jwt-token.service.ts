
import { Injectable } from '@angular/core';


@Injectable(
    {
        providedIn: 'root'
    }
)
export class JwtTokenService {

  getToken(): String {
    return window.localStorage['access_token'];
  }

  saveToken(data: any) {
     // console.log(data)
     window.localStorage['access_token'] = data.token;
     return;
  }

  destroyToken() {
    window.localStorage.removeItem('access_token');
  }

}