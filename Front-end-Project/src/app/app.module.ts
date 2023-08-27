import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { IndexPageComponent } from './component/index-page/index-page.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { CreatePostComponent } from './component/create-post/create-post.component';
import { ShowPostComponent } from './component/show-post/show-post.component';
import { ShowFollowersComponent } from './component/show-followers/show-followers.component';
import { ShowProfileComponent } from './component/show-profile/show-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    IndexPageComponent,
    NavBarComponent,
    CreatePostComponent,
    ShowPostComponent,
    ShowFollowersComponent,
    ShowProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
