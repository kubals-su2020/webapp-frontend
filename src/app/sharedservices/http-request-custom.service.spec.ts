import { TestBed } from '@angular/core/testing';

import { HttpRequestCustomService } from './http-request-custom.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HttpRequestCustomService', () => {
  let service: HttpRequestCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpRequestCustomService,HttpClient,HttpHandler]
    });
    service = TestBed.inject(HttpRequestCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
