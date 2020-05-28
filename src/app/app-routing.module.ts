import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/authservices/auth.guard';

const routes: Routes = [
  { path:'signup', component:SignUpComponent},
  { path:'signin', component:SignInComponent},
  { path:'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  { path:'settings', component:SettingsComponent,canActivate:[AuthGuard]},
  { path:'home', component:HomeComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
