import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookListingComponent } from './my-book-listing.component';

describe('MyBookListingComponent', () => {
  let component: MyBookListingComponent;
  let fixture: ComponentFixture<MyBookListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
