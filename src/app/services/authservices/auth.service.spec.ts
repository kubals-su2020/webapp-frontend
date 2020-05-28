import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpRequestCustomService } from 'src/app/sharedservices/http-request-custom.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpRequestCustomService,HttpClient,HttpHandler],
       imports:[RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
