import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpRequestCustomService } from 'src/app/sharedservices/http-request-custom.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      providers:[HttpRequestCustomService,HttpClient,HttpHandler]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
