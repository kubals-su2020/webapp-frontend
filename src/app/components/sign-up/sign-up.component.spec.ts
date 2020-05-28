import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtTokenService } from 'src/app/sharedservices/jwt-token.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {Location} from '@angular/common';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
         SignUpComponent,
         DummyComponent ],
      imports:[RouterTestingModule.withRoutes([
        {path:'',component:DummyComponent}
      ])],
      providers:[
        {provide: AuthService,useClass : AuthServiceStub},
        {provide:JwtTokenService,useClass:JwtTokenServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe("Simple HTML tests",()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should contain Sign up as card title',()=>{
      const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
      expect(cardTitle.nativeElement.textContent).toBe('Sign up')
    })
    it('should be minimum one button on page',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length>=1).toBeTruthy();
    })
    it('should be a sign up button on page after password show/hide first',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
      // debugger;
      expect(nativeBtn.textContent).toBe('Sign up!');
    })
    it('should have only four input fields',()=>{
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(4);
    })
  })
  describe("Navigation tests",()=>{
    it('should navigate to / before click on sign up',()=>{
      const location = TestBed.get(Location);
      expect(location.path()).toBe('')
    })
  })
  describe("Functionality/Event Test",()=>{
    
    it('should have onsubmit called once after button click',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
      fixture.detectChanges();
      spyOn(component,'onSubmit');
      nativeBtn.click();
      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalledTimes(1);
      });
    })
    it('should have onsubmit called after button click',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
      fixture.detectChanges();
      spyOn(component,'onSubmit');
      nativeBtn.click();
      fixture.whenStable().then(() => {
        expect(component.onSubmit).toHaveBeenCalled();
        expect(component.onSubmit).toHaveBeenCalledTimes(1);
      });
    })
  })

  // it('should navigate to /home after click on sign up',()=>{
  //   const location = TestBed.get(Location);
  //   const buttons = fixture.debugElement.queryAll(By.css('button'));
  //   const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
  //   nativeBtn.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(()=>{
  //     expect(location.path()).toBe('/home')
  //   })
  // })

});
class AuthServiceStub{

}
class JwtTokenServiceStub{

}
@Component({template:''})
class DummyComponent{}