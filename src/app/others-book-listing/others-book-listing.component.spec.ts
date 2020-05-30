import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersBookListingComponent } from './others-book-listing.component';

describe('OthersBookListingComponent', () => {
  let component: OthersBookListingComponent;
  let fixture: ComponentFixture<OthersBookListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersBookListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersBookListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
