import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormatErrorComponent } from './components/format-error/format-error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/authservices/auth.guard';
import { HttpRequestCustomService } from './sharedservices/http-request-custom.service';
import { MyBookListingComponent } from './components/my-book-listing/my-book-listing.component';
import { OthersBookListingComponent } from './components/others-book-listing/others-book-listing.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { CartComponent } from './components/cart/cart.component';
import { DialogContentExampleDialog } from './components/my-book-listing/my-book-listing.component'; 
import { DialogContentExampleDialog1 } from './components/cart/cart.component';
import { DialogContentExampleDialog3 } from './components/update-book/update-book.component'
import { SuccessDialog } from './components/cart/cart.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ViewBookImagesComponent } from './components/view-book-images/view-book-images.component'; 


import { MatCarouselModule } from '@ngmodule/material-carousel';
import { TestComponent } from './components/test/test.component';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FormatErrorComponent,
    SignUpComponent,
    SignInComponent,
    SettingsComponent,
    ProfileComponent,
    PageNotFoundComponent,
    NavBarComponent,
    HomeComponent,
    MyBookListingComponent,
    OthersBookListingComponent,
    UpdateBookComponent,
    CartComponent,
    DialogContentExampleDialog,
    DialogContentExampleDialog1,
    DialogContentExampleDialog3,
    AddBookComponent,
    SuccessDialog,
    ViewBookImagesComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    MatBadgeModule,
    MatDialogModule,
    MatCarouselModule
  ],
  providers: [
    AuthGuard,
    HttpRequestCustomService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

