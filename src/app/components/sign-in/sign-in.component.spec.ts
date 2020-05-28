import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { JwtTokenService } from 'src/app/sharedservices/jwt-token.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authServiceMock :any;
  beforeEach(async(() => {
    authServiceMock = jasmine.createSpyObj('AuthService',['signIn']);
    authServiceMock.signIn.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports:[RouterTestingModule],
      providers:[
        //  {provide:JwtTokenService,useClass:authServiceStub}
        {provide:AuthService,useValue:authServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
   
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("Simple HTML test",()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should contain Sign in as card title',()=>{
      const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
      expect(cardTitle.nativeElement.textContent).toBe('Sign in')
    })
    it('should be minimum one button on page',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length>=1).toBeTruthy();
    })
    it('should be a sign in button on page after password show/hide first',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
      // debugger;
      expect(nativeBtn.textContent).toBe('Sign in!');
    })
    it('should have only two input fields',()=>{
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(2);
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
  // describe("Navigation tests",()=>{
  //   it('should navigate to / before click on sign in',()=>{
  //     const location = TestBed.get(Location);
  //     expect(location.path()).toBe('')
  //   })
  // })
});
// class AuthServiceStub{

// }
