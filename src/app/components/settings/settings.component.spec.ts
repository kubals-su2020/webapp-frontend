import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { ProfileService } from 'src/app/services/userservices/profile.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports:[RouterTestingModule],
      providers:[
        {provide:AuthService,useClass:AuthServiceStub},
        {provide:ProfileService,useClass:ProfileServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe("Simple HTML tests",()=>{
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should contain Settings as card title',()=>{
      const cardTitle = fixture.debugElement.query(By.css('mat-card-title'));
      expect(cardTitle.nativeElement.textContent).toBe('Settings')
    })
    it('should be minimum one button on page',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length>=1).toBeTruthy();
    })
    it('should be a Update Profile button on page after password show/hide first',()=>{
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      const nativeBtn :HTMLButtonElement = buttons[1].nativeElement; 
      // debugger;
      expect(nativeBtn.textContent).toBe('Update Profile');
    })
    it('should have only four input fields',()=>{
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(4);
    })
  })

});
class AuthServiceStub{

}
class ProfileServiceStub{
  getUser(): Observable<any> {
    return of({});
  }
}