import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/authservices/auth.guard';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { CartComponent } from './components/cart/cart.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ViewBookImagesComponent } from './components/view-book-images/view-book-images.component';
import { TestComponent } from './components/test/test.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'signup', component:SignUpComponent},
  { path:'signin', component:SignInComponent},
  { path:'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  { path:'settings', component:SettingsComponent,canActivate:[AuthGuard]},
  { path:'home', component:HomeComponent,canActivate:[AuthGuard]},
  { path:'updatebook/:id',component:UpdateBookComponent},
  { path:'cart', component:CartComponent},
  { path:'addbook', component:AddBookComponent},
  { path:'viewImages/:id', component:ViewBookImagesComponent,canActivate:[AuthGuard]},
  { path:'test',component:TestComponent},
  { path:'resetpassword',component:ForgotPasswordComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
