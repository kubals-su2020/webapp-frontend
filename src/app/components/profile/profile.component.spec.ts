import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileService } from 'src/app/services/userservices/profile.service';
import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ProfileComponent],
      providers:[{provide:ProfileService,useClass :ProfileServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create profile with dummy test_first_name test_last_name values', () => {
    let user:any;
    user = {
      email:"test.one@gmail.com",
      first_name:"test_first_name",
      last_name:"test_last_name"
    }
    component.profile = user;
    fixture.detectChanges();
    const cardTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    const cardTitleEle :HTMLElement = cardTitles[0].nativeElement;
    // debugger;
    expect(cardTitleEle.textContent).toBe(user.first_name+" "+user.last_name);
  });
  it('should create profile with dummy test.one@gmail.com value', () => {
    let user:any;
    user = {
      email:"test.one@gmail.com",
      first_name:"test_first_name",
      last_name:"test_last_name"
    }
    component.profile = user;
    fixture.detectChanges();
    const cardSubTitles = fixture.debugElement.queryAll(By.css('mat-card-subtitle'));
    const cardSubTitleEle :HTMLElement = cardSubTitles[0].nativeElement;
    // debugger;
    expect(cardSubTitleEle.textContent).toBe(user.email);
  });
});
class ProfileServiceStub{
  getUser(): Observable<any> {
    return of({});
  }
}
// @Component({template:''})
// class DummyComponent{}